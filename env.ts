import { z } from "zod";

/**
 * We need to write process.env.<VAR> explicitly, otherwise env var is not injected.
 */

export const Env = z
  .object({
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string(),
    NEXT_PUBLIC_HASURA_SECRET: z.string(),
  })
  .parse({
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    NEXT_PUBLIC_HASURA_SECRET: process.env.NEXT_PUBLIC_HASURA_SECRET,
  });
