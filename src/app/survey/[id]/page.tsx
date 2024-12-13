"use client";

import { Toolbar } from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../../relay/environment";

const SurveyQuery = graphql`
  query pageSurveyQuery($surveyId: ID!) {
    survey(id: $surveyId) {
      title
    }
  }
`;

export default async () => {
  // const surveys = await getAllSurveys();

  return (
    <>
      <Toolbar title="My Survey" />
      {/* {surveys} */}
      <Button>Save</Button>

      <QueryRenderer
        environment={environment}
        query={SurveyQuery}
        variables={{ surveyId: 2 }}
        render={({ error, props }) => {
          if (error) {
            return <div>Error: {error.message}</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          // Render your component with the fetched data
          return <div>Data: {JSON.stringify(props)}</div>;
        }}
      />
    </>
  );
};
