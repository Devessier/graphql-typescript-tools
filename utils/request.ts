import axios from "axios";
import { Env } from "../env";
import { Kind, OperationTypeNode, print } from "graphql";
import {
  TypedDocumentNode,
  ResultOf,
  VariablesOf,
} from "@graphql-typed-document-node/core";
import { AxiosResponse } from "axios";
import invariant from "tiny-invariant";
import * as gqlZodSchemas from "../gql/graphql.zod";

export const hasuraAxios = axios.create({
  baseURL: Env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  headers:
    Env.NEXT_PUBLIC_HASURA_SECRET === ""
      ? {}
      : {
          "x-hasura-admin-secret": Env.NEXT_PUBLIC_HASURA_SECRET,
        },
});

export function getZodSchemaForDocument(document: TypedDocumentNode<any, any>) {
  const first = document.definitions[0];
  if (first.kind !== Kind.OPERATION_DEFINITION) {
    throw new Error("Definition does not start with operation definition");
  }

  const operationType = first.operation;
  const operationName = first.name?.value;
  invariant(typeof operationName === "string", "Operation name is not defined");

  return gqlZodSchemas[
    getNamedImportFromOperationNameAndType({
      operationName,
      operationType,
    }) as keyof typeof gqlZodSchemas
  ];
}

export async function makeGqlRequest<
  Document extends TypedDocumentNode<any, Record<string, never>>
>(document: Document): Promise<ResultOf<Document>>;

export async function makeGqlRequest<
  Document extends TypedDocumentNode<any, any>
>(
  document: Document,
  variables: VariablesOf<Document>
): Promise<ResultOf<Document>>;

export async function makeGqlRequest<
  Document extends TypedDocumentNode<any, any>
>(
  document: Document,
  variables?: VariablesOf<Document>
): Promise<ResultOf<Document>> {
  const zodSchema = getZodSchemaForDocument(document);

  const response = await hasuraAxios.post<
    any,
    AxiosResponse<{ data: ResultOf<Document> }>
  >("/", {
    query: print(document),
    variables,
  });

  return zodSchema.parse(response.data.data) as ResultOf<Document>;
}

function getNamedImportFromOperationNameAndType({
  operationName,
  operationType,
}: {
  operationName: string;
  operationType: OperationTypeNode;
}): string {
  switch (operationType) {
    case OperationTypeNode.MUTATION: {
      return `${operationName}Mutation`;
    }
    case OperationTypeNode.QUERY: {
      return `${operationName}Query`;
    }
    case OperationTypeNode.SUBSCRIPTION: {
      return `${operationName}Subscription`;
    }
    default: {
      throw new Error("Invalid operation type");
    }
  }
}
