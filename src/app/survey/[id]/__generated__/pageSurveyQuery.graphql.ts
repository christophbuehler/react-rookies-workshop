/**
 * @generated SignedSource<<cadc3e069ddef86730f40812a9647df5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageSurveyQuery$variables = {
  surveyId: string;
};
export type pageSurveyQuery$data = {
  readonly survey: {
    readonly title: string;
  } | null | undefined;
};
export type pageSurveyQuery = {
  response: pageSurveyQuery$data;
  variables: pageSurveyQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "surveyId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "surveyId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageSurveyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Survey",
        "kind": "LinkedField",
        "name": "survey",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pageSurveyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Survey",
        "kind": "LinkedField",
        "name": "survey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bdf5f65a3429a9904a3921dfeeb4adbf",
    "id": null,
    "metadata": {},
    "name": "pageSurveyQuery",
    "operationKind": "query",
    "text": "query pageSurveyQuery(\n  $surveyId: ID!\n) {\n  survey(id: $surveyId) {\n    title\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e000f1ff276443c04f26999c174107f";

export default node;
