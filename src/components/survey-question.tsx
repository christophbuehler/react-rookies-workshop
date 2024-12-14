import { useContext } from "react";
import { SurveyQuestionMultipleChoice } from "./survey-question-multiple-choice";
import { Input } from "./ui/input";
import { SurveyDataContext } from "./survery-host";

export type SurveyQuestionType = "text" | "multiple-choice";

export interface BaseQuestion<
  T extends SurveyQuestionType,
  P extends Record<string, unknown>
> {
  type: T;
  additionalProps: P;
  id: string;
  title: string;
}

export interface SurveyQuestionProps {
  questionId: string;
  isEdit: boolean;
}

export const SurveyQuestion = ({ questionId, isEdit }: SurveyQuestionProps) => {
  const [questions, dispatchSurveyData] = useContext(SurveyDataContext);
  const question = questions.find((q) => q.id === questionId)!;

  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="strong">Question Title*</label>
        <Input
          value={question.title}
          onChange={(evt) =>
            dispatchSurveyData!({
              type: "set",
              questionId,
              data: {
                ...question,
                title: evt.target.value,
              },
            })
          }
        />
      </div>
      <QuestionBody
        type={question.type}
        isEdit={isEdit}
        questionId={questionId}
      />
    </>
  );
};

interface QuestionBodyProps {
  isEdit: boolean;
  questionId: string;
  type: SurveyQuestionType;
}

const QuestionBody = ({ type, isEdit, questionId }: QuestionBodyProps) => {
  switch (type) {
    case "multiple-choice":
      return (
        <>
          <SurveyQuestionMultipleChoice
            questionId={questionId}
            isEdit={isEdit}
          />
        </>
      );
  }

  return <>Question type not supported</>;
};
