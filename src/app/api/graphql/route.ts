import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import {
  getAllSurveys,
  createSurvey,
  getSurveyById,
  postSurveyAnswer,
} from "../../../lib/db";

const typeDefs = `#graphql
  type Question {
    id: ID!
    title: String!
    question_order: Int!
  }

  type Survey {
    id: ID!
    number: Int!
    title: String!
    questions: [Question!]!
  }

  type Query {
    surveys: [Survey!]!
    survey(id: ID!): Survey
  }

  input SurveyQuestionInput {
    title: String!
  }

  input SurveyResponseInput {
    survey_question_id: ID!
    response: String!
  }

  type Mutation {
    addSurvey(number: Int!, title: String!, questions: [String!]!): Survey!
    submitSurveyResponse(surveyId: ID!, responses: [SurveyResponseInput!]!): ID!
  }
`;

const resolvers = {
  Query: {
    surveys: async () => {
      const surveys = await getAllSurveys();
      return surveys;
    },
    survey: async (_, { id }) => {
      const survey = await getSurveyById(parseInt(id, 10));
      return survey;
    },
  },
  Mutation: {
    addSurvey: async (_, { number, title, questions }) => {
      const surveyId = await createSurvey(number, title, questions);
      return getSurveyById(surveyId);
    },
    submitSurveyResponse: async (_, { surveyId, responses }) => {
      const responseId = await postSurveyAnswer(
        parseInt(surveyId, 10),
        responses
      );
      return responseId;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
