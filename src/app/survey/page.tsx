import { SurveyHost } from "@/components/survery-host";
import { SurveyQuestion } from "@/components/survey-question";
import { MultipleChoiceQuestionDefinition } from "@/components/survey-question-multiple-choice";
import { Toolbar } from "@/components/toolbar";
import { Input } from "@/components/ui/input";
import { useId } from "react";

export default () => {
  return (
    <>
      <Toolbar />
      <SurveyHost isEdit={true} />
      {/* 
      <div className="flex flex-col gap-8 items-start">
        <Button>Add Question</Button>
      </div> */}
      {/* <Button onClick={() => create()}>Create Survey</Button> */}
    </>
  );
};
