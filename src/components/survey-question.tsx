export type SurveyQuestionType = "text" | "multiple-choice";

interface BaseSurveyQuestionDefinition<T> {
  title?: string;
  type?: SurveyQuestionType;
  State: T;
  id: string;
}

interface TextQuestionDefinition extends BaseSurveyQuestionDefinition<string> {
  type: "text";
  placeholder?: string;
}

interface MultipleChoiceQuestionDefinition
  extends BaseSurveyQuestionDefinition<number[]> {
  type: "multiple-choice";
  options: string[];
}

export type SurveyQuestionDefinition =
  | TextQuestionDefinition
  | MultipleChoiceQuestionDefinition;

export interface SurveyQuestionProps {
  definition: SurveyQuestionDefinition;
}

export const SurveyQuestion = ({ definition }: SurveyQuestionProps) => {
  return <>ENTER TITLE</>;
};
