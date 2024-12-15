"use client";

import { useContext } from "react";
import { BaseQuestion } from "./survey-question";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { SurveyDataContext, SurveyStateContext } from "./survery-host";

export interface MultipleChoiceOption {
  key: string;
  label: string;
}

export type MultipleChoiceCustomProps = {
  options: MultipleChoiceOption[];
};

export type MultipleChoiceState = { value: string[] };

export type MultipleChoiceQuestionData = BaseQuestion<
  "multiple-choice",
  MultipleChoiceCustomProps
>;

export type DataAction =
  | { type: "add-option" }
  | { type: "change-option"; option: MultipleChoiceOption };

const dataReducer = (
  state: MultipleChoiceQuestionData,
  action: DataAction
): MultipleChoiceQuestionData => {
  switch (action.type) {
    case "add-option":
      return {
        ...state,
        additionalProps: {
          ...state.additionalProps,
          options: [
            ...state.additionalProps.options,
            { key: crypto.randomUUID(), label: "" },
          ],
        },
      };
    case "change-option":
      return {
        ...state,
        additionalProps: {
          ...state.additionalProps,
          options: state.additionalProps.options.map((o) =>
            o.key === action.option.key ? action.option : o
          ),
        },
      };
  }
};

export type StateAction = { type: "toggle"; key: string };

const stateReducer = (state: MultipleChoiceState, action: StateAction) => {
  switch (action.type) {
    case "toggle":
      const isChecked = state.value.includes(action.key);
      return {
        value: isChecked
          ? state.value.filter((k) => k !== action.key)
          : [...state.value, action.key],
      };
  }
};

export interface MultipleChoiceQuestionProps {
  questionId: string;
  isEdit: boolean;
}

export const SurveyQuestionMultipleChoice = ({
  questionId,
  isEdit,
}: MultipleChoiceQuestionProps) => {
  const [questions, dispatchSurveyData] = useContext(SurveyDataContext);
  const [state, dispatchSurveyState] = useContext(SurveyStateContext);

  const myData = questions.find(
    (q) => q.id === questionId
  ) as MultipleChoiceQuestionData;
  const { options } = myData.additionalProps;

  const myState = state[questionId] as MultipleChoiceState;

  const dispatchData = (action: DataAction) =>
    dispatchSurveyData!({
      type: "set",
      questionId: questionId,
      data: dataReducer(myData, action),
    });

  const dispatchState = (action: StateAction) =>
    dispatchSurveyState!({
      type: "set",
      questionId: questionId,
      state: stateReducer(myState, action),
    });

  if (isEdit)
    return (
      <>
        <div className="mt-2 flex flex-col gap-4 p-4">
          {options.map((option) => (
            <div key={option.key} className="flex items-center gap-4">
              <Checkbox />
              <div className="flex-1">
                <Input
                  value={option.label}
                  onChange={(evt) =>
                    dispatchData({
                      type: "change-option",
                      option: {
                        ...option,
                        label: evt.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => dispatchData({ type: "add-option" })}>
          Add Option
        </Button>
      </>
    );

  return (
    <>
      <div className="mt-2 flex flex-col gap-4 p-4">
        {options.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <Checkbox
              id="terms"
              checked={myState.value.includes(key)}
              onChange={() => dispatchState({ type: "toggle", key })}
            />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
