/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addSurvey: Survey;
  submitSurveyResponse: Scalars['ID']['output'];
};


export type MutationAddSurveyArgs = {
  number: Scalars['Int']['input'];
  questions: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationSubmitSurveyResponseArgs = {
  responses: Array<SurveyResponseInput>;
  surveyId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  survey?: Maybe<Survey>;
  surveys: Array<Survey>;
};


export type QuerySurveyArgs = {
  id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  question_order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Survey = {
  __typename?: 'Survey';
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type SurveyQuestionInput = {
  title: Scalars['String']['input'];
};

export type SurveyResponseInput = {
  response: Scalars['String']['input'];
  survey_question_id: Scalars['ID']['input'];
};

export type SurveyQueryVariables = Exact<{
  surveyId: Scalars['ID']['input'];
}>;


export type SurveyQuery = { __typename?: 'Query', survey?: { __typename?: 'Survey', title: string } | null };


export const SurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"survey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surveyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"survey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surveyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<SurveyQuery, SurveyQueryVariables>;