import { useQueryClient } from "react-query";
import {
  TypedDocumentNode,
  VariablesOf,
} from "@graphql-typed-document-node/core";
import { useEffect } from "react";
import { print } from "graphql";
import { Client } from "graphql-ws";
import { getZodSchemaForDocument } from "./request";

function defaultOnError(error: unknown) {
  console.error("An error occured in GraphQL subscription", error);
}

export function useSubscription<
  Document extends TypedDocumentNode<any, Record<string, never>>
>(args: {
  client: Client;
  query: Document;
  queryToInvalidate: string | string[];
  onComplete?: () => void;
  onError?: (error: unknown) => void;
}): void;

export function useSubscription<Document extends TypedDocumentNode<any, any>>(args: {
  client: Client;
  query: Document;
  variables: VariablesOf<Document>;
  queryToInvalidate: string | string[];
  onComplete?: () => void;
  onError?: (error: unknown) => void;
}): void;

export function useSubscription<Document extends TypedDocumentNode<any, any>>({
  client,
  query,
  variables,
  queryToInvalidate,
  onComplete,
  onError = defaultOnError,
}: {
  client: Client;
  query: Document;
  variables?: VariablesOf<Document>;
  queryToInvalidate: string | unknown[];
  onComplete?: () => void;
  onError?: (error: unknown) => void;
}): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const zodSchema = getZodSchemaForDocument(query);

    const unsubscribe = client.subscribe(
      {
        query: print(query),
        variables,
      },
      {
        next(value) {
          // Ensure gotten data are correct, or throw.
          const _parsedValue = zodSchema.parse(value.data);

          queryClient.invalidateQueries(queryToInvalidate);
        },
        complete() {
          onComplete?.();
        },
        error(error) {
          console.error(error);

          onError(error);
        },
      }
    );

    return () => {
      unsubscribe();
    };
  }, [
    client,
    onComplete,
    onError,
    query,
    queryClient,
    queryToInvalidate,
    variables,
  ]);
}
