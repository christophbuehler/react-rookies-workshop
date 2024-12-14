import { fetchGraphQL } from "@/lib/fetch-graphql";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

// function fetchQuery(operation, variables) {
//   return fetch("api/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: operation.text,
//       variables,
//     }),
//   }).then((response) => response.json());
// }

// export default new Environment({
//   network: Network.create(fetchQuery),
//   store: new Store(new RecordSource()),
// });

async function fetchRelay(params, variables) {
  return fetchGraphQL(params.text, variables);
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
