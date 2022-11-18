import * as dotenv from 'dotenv'
dotenv.config({
  path: './.env.local'
})

import type { CodegenConfig } from "@graphql-codegen/cli";
import { Env } from "./env";

const config: CodegenConfig = {
  schema: [
    {
        [Env.NEXT_PUBLIC_GRAPHQL_ENDPOINT]: {
            // headers: {
            //     'x-hasura-admin-secret': Env.NEXT_PUBLIC_HASURA_SECRET
            // }
        }
    }
  ],
  documents: ["pages/**/*.tsx"],
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
      config: {
        // See `scalars` option on https://www.the-guild.dev/graphql/codegen/plugins/typescript/typescript
        scalars: {
          // If not providing types for these scalars, they will default to `any` and cause issues with ts-to-zod library.
          uuid: 'string',
          timestamptz: 'string'
        }
      }
    },
    './schema.graphql': {
      plugins: ['schema-ast']
    }
  },
};

export default config;
