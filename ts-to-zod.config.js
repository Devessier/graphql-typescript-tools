/**
 * ts-to-zod configuration.
 * See https://twitter.com/ryantotweets/status/1590744881969844236.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = {
  input: "gql/graphql.ts",
  output: "gql/graphql.zod.ts",
  nameFilter: (name) => /(Query|Mutation|Subscription)$/.test(name),
  getSchemaName: (name) => name,
};
