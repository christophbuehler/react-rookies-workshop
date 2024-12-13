import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {
  return open({
    filename: "./.data/database.sqlite",
    driver: sqlite3.Database,
  });
}

export async function getAllSurveys() {
  const db = await openDB();
  const surveys = await db.all("SELECT id, number, title FROM survey");
  return surveys;
}

interface SurveyWithQuestions {
  id: number;
  number: number;
  title: string;
  questions: {
    id: number;
    title: string;
    question_order: number;
  }[];
}

export async function createSurvey(
  number: number,
  title: string,
  questions: string[]
): Promise<number> {
  const db = await openDB();

  await db.exec("BEGIN TRANSACTION");
  try {
    const result = await db.run(
      "INSERT INTO survey (number, title) VALUES (?, ?)",
      [number, title]
    );
    const surveyId = result.lastID;

    for (let i = 0; i < questions.length; i++) {
      await db.run(
        "INSERT INTO survey_question (survey_id, title, question_order) VALUES (?, ?, ?)",
        [surveyId, questions[i], i + 1]
      );
    }

    await db.exec("COMMIT");
    return surveyId;
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }
}

export async function getSurveyById(
  id: number
): Promise<SurveyWithQuestions | null> {
  const db = await openDB();

  const survey = await db.get(
    "SELECT id, number, title FROM survey WHERE id = ?",
    [id]
  );
  if (!survey) {
    return null;
  }

  const questions = await db.all(
    "SELECT id, title, question_order FROM survey_question WHERE survey_id = ? ORDER BY question_order ASC",
    [id]
  );

  return {
    ...survey,
    questions,
  };
}

interface SurveyResponseInput {
  survey_question_id: number;
  response: string;
}

export async function postSurveyAnswer(
  surveyId: number,
  responses: SurveyResponseInput[]
): Promise<number> {
  const db = await openDB();
  const timestamp = new Date().toISOString();

  await db.exec("BEGIN TRANSACTION");
  try {
    const responseResult = await db.run(
      "INSERT INTO survey_response (timestamp) VALUES (?)",
      [timestamp]
    );
    const surveyResponseId = responseResult.lastID;

    for (const r of responses) {
      await db.run(
        "INSERT INTO survey_question_response (survey_question_id, survey_response_id, timestamp, response) VALUES (?, ?, ?, ?)",
        [r.survey_question_id, surveyResponseId, timestamp, r.response]
      );
    }

    await db.exec("COMMIT");
    return surveyResponseId;
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }
}

export async function GET(request: NextRequest) {
  // Check if there's an 'id' query parameter to get a specific survey
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");

  try {
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid id parameter" },
          { status: 400 }
        );
      }

      const survey = await getSurveyById(id);
      if (!survey) {
        return NextResponse.json(
          { error: "Survey not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(survey);
    }

    // No id means return all surveys
    const surveys = await getAllSurveys();
    return NextResponse.json(surveys);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "create") {
      // Creating a new survey
      const { number, title, questions } = body;
      if (!number || !title || !Array.isArray(questions)) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const surveyId = await createSurvey(number, title, questions);
      return NextResponse.json({ surveyId }, { status: 201 });
    } else if (body.type === "answer") {
      // Posting answers to a survey
      const { surveyId, responses } = body;
      if (!surveyId || !Array.isArray(responses)) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const newResponseId = await postSurveyAnswer(surveyId, responses);
      return NextResponse.json(
        { surveyResponseId: newResponseId },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Invalid request type" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
