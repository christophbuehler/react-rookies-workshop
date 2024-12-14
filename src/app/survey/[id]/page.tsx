import { Toolbar } from "@/components/toolbar";
import { getClient } from "@/lib/api";
import { gql } from "@generated/gql";

const surveyQuery = gql(`
  query survey($surveyId: ID!) {
    survey(id: $surveyId) {
      title
    }
  }
`);

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async ({ params }: PageProps) => {
  const { id } = await params;
  const { data } = await getClient().query({
    query: surveyQuery,
    variables: {
      surveyId: id,
    },
  });
  return (
    <>
      <Toolbar title="My Survey" />
      hello: {JSON.stringify(data)}
    </>
  );
};
