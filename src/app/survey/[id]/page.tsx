"use client";

import { Toolbar } from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import environment from "../../../relay/environment";
import { Suspense } from "react";
import { OperationType } from "relay-runtime";

const SurveyQuery = graphql`
  query pageSurveyQuery($surveyId: ID!) {
    survey(id: $surveyId) {
      title
    }
  }
`;

const preloadedSurveyQuery = loadQuery(environment, SurveyQuery, {
  surveyId: 4,
});

export default () => {
  return (
    <>
      <Toolbar title="My Survey" />
      {/* {surveys} */}
      <Button>Save</Button>

      <Suspense fallback={<div>Loading survey...</div>}>
        <SurveyComponent preloadedQuery={preloadedSurveyQuery} />
      </Suspense>
    </>
  );
};

const SurveyComponent = ({
  preloadedQuery,
}: {
  preloadedQuery: PreloadedQuery<OperationType, {}>;
}) => {
  const data = usePreloadedQuery(SurveyQuery, preloadedQuery);

  return (
    <div>
      <h1>Survey : {JSON.stringify(data)}</h1>
    </div>
  );
};
