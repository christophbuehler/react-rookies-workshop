"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { MultipleChoiceQuestionData } from "./survey-question-multiple-choice";
import { Input } from "./ui/input";
import { BaseQuestion, SurveyQuestion } from "./survey-question";
import { Button } from "./ui/button";
import React from "react";
import { ApolloProvider, useMutation } from "@apollo/client";
import { gql } from "@generated/gql";
import { getClient } from "@/lib/api";

export interface SurveyHostProps {
  isEdit: boolean;
}

export const SurveyHost = ({ isEdit }: SurveyHostProps) => {
  return (
    <SurveyStateProvider>
      <SurveyDataProvider>
        <ApolloProvider client={getClient()}>
          <SurveyHostBody isEdit={isEdit} />
        </ApolloProvider>
      </SurveyDataProvider>
    </SurveyStateProvider>
  );
};

export type SurveyData = BaseQuestion<any, any>[];

export type DataAction =
  | { type: "set"; questionId: string; data: BaseQuestion<any, any> }
  | { type: "add"; data: BaseQuestion<any, any> };
export const dataReducer = (
  state: SurveyData,
  action: DataAction
): SurveyData => {
  switch (action.type) {
    case "set":
      return state.map((s) => (s.id === action.questionId ? action.data : s));
    case "add":
      return [...state, action.data];
  }
};

export const SurveyDataContext = createContext<
  [SurveyData, Dispatch<DataAction> | undefined]
>([[], undefined]);

export const SurveyDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, []);
  return (
    <SurveyDataContext.Provider value={[state, dispatch]}>
      {children}
    </SurveyDataContext.Provider>
  );
};

export type SurveyState = { [questionId: string]: unknown };

export type StateAction = { type: "set"; questionId: string; state: unknown };
export const stateReducer = (state: SurveyState, action: StateAction) => {
  switch (action.type) {
    case "set":
      return { ...state, [action.questionId]: action.state };
  }
};

export const SurveyStateContext = createContext<
  [SurveyState, Dispatch<StateAction> | undefined]
>([{}, undefined]);

export const SurveyStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, {});
  return (
    <SurveyStateContext.Provider value={[state, dispatch]}>
      {children}
    </SurveyStateContext.Provider>
  );
};

const addSurveyMutation = gql(`
 mutation Mutation($number: Int!, $title: String!, $questions: [String!]!) {
    addSurvey(number: $number, title: $title, questions: $questions) {
      id
      number
      questions {
        id
        question_order
        title
      }
    }
  }
`);

const SurveyHostBody = ({ isEdit }: SurveyHostProps) => {
  const [surveyData, dispatchSurveyData] = useContext(SurveyDataContext);
  const [surveyState] = useContext(SurveyStateContext);
  // const [addSurvey, { data, loading, error }] = useMutation(addSurveyMutation);

  // function createSurvey() {
  //   const variables = {
  //     number: 1,
  //     title: "Sample Survey",
  //     questions: ["Question 1", "Question 2"],
  //   };

  //   addSurvey({ variables });
  // }

  return (
    <>
      State:
      <p>{JSON.stringify(surveyState)}</p>
      Data:
      <p>{JSON.stringify(surveyData)}</p>
      <div className="w-3/5">
        <div className="flex flex-col gap-2">
          <label className="strong">Survey Title</label>
          <Input type="email" placeholder="My awesome survey" />
        </div>
        <hr className="bg-primary my-8" />
        {surveyData.map((data) => (
          <SurveyQuestion key={data.id} questionId={data.id} isEdit={isEdit} />
        ))}

        <Button
          onClick={() =>
            dispatchSurveyData!({
              type: "add",
              data: {
                id: crypto.randomUUID(),
                type: "multiple-choice",
                title: "",
                additionalProps: {
                  options: [{ key: crypto.randomUUID(), label: "HEllooo" }],
                },
              } as MultipleChoiceQuestionData,
            })
          }
        >
          Add Question
        </Button>

        {/* <Button onClick={() => createSurvey()}>CREATE THE SURVEY??</Button> */}
      </div>
    </>
  );
};
