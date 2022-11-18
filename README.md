# TypeScript tools for GraphQL

## GraphQL Codegen + Zod

Create `.env.local` based on `.env.example`.

For one-time use:

```bash
yarn codegen:graphql && yarn ts-to-zod
```

To launch watch mode for GraphQL Codegen:

```bash
yarn codegen:graphql:watch
```

Then to generate Zod schemas periodically:

```bash
yarn ts-to-zod
```

## GraphQL VSCode extension

See https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

## How to write GraphQL queries?

Always define GraphQL queries/mutations/subscriptions with `graphql` from `/gql`. **Be sure to regenerate GraphQL types (see above).**

Use `makeGqlRequest` function to make queries/mutations.

Use `useSubscription` hook to make subscriptions.

Variables are strongly typed for both functions.
