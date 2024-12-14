import { getClient } from "@/lib/api";
import { gql } from "@apollo/client";

const surveyQuery = gql`
  query pageSurveyQuery($surveyId: ID!) {
    survey(id: $surveyId) {
      title
    }
  }
`;

export default async () => {
  const { data } = await getClient().query({
    query: surveyQuery,
    variables: {
      surveyId: 4,
    },
    // context: {
    //   fetchOptions: {
    //     next: { revlidte: 10 },
    //   },
    // },
  });
  return <>hello: {JSON.stringify(data)}</>;
};

// import { Toolbar } from "@/components/toolbar";
// import { Button } from "@/components/ui/button";
// import {
//   graphql,
//   loadQuery,
//   PreloadedQuery,
//   RelayEnvironmentProvider,
//   usePreloadedQuery,
// } from "react-relay";
// import environment from "../../../relay/environment";
// import { Suspense } from "react";
// import { OperationType } from "relay-runtime";

// const preloadedQuery = loadQuery(environment, SurveyQuery, {
//   surveyId: 4,
// });
// export default async () => {
//   // const data = usePreloadedQuery(SurveyQuery, preloadedSurveyQuery);

//   return (
//     <>
//       {/* <Toolbar title="My Survey" /> */}
//       {/* {surveys} */}
//       {/* <Button>Save</Button> */}
//       hellp
//       {/* <Suspense fallback={<div>Loading survey...</div>}> */}
//       HIII
//       <SurveyComponent preloadedQuery={preloadedQuery} />
//       {/* </Suspense> */}
//     </>
//   );
// };

// {
//   /* <main className="mx-auto container my-4"></main> */
// }
