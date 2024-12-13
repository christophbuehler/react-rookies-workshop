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

  // Start a transaction
  await db.exec("BEGIN TRANSACTION");
  try {
    // Insert the survey
    const result = await db.run(
      "INSERT INTO survey (number, title) VALUES (?, ?)",
      [number, title]
    );
    const surveyId = result.lastID;

    // Insert each question
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

  // We assume `responses` are all for questions that belong to this `surveyId`.
  // You may want to validate that the question IDs correspond to the correct survey.

  const timestamp = new Date().toISOString();

  await db.exec("BEGIN TRANSACTION");
  try {
    // Create a new survey response
    const responseResult = await db.run(
      "INSERT INTO survey_response (timestamp) VALUES (?)",
      [timestamp]
    );
    const surveyResponseId = responseResult.lastID;

    // Insert each question response
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
