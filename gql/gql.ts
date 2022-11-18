/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n      query GetArticleById($id: uuid!) {\n        article: news_feeds_by_pk(uuid: $id) {\n          uuid\n          title\n          text\n          news_comments(order_by: { created_at: desc }) {\n            uuid\n            text\n            created_at\n          }\n          created_at\n        }\n      }\n    ": types.GetArticleByIdDocument,
    "\n      mutation SendComment($articleId: uuid!, $comment: String!) {\n        insert_news_comments_one(\n          object: { news_feed_uuid: $articleId, text: $comment }\n        ) {\n          uuid\n        }\n      }\n    ": types.SendCommentDocument,
    "\n      subscription LastCommentForArticleById($articleId: uuid!) {\n        news_comments(\n          order_by: { created_at: desc }\n          where: { news_feed_uuid: { _eq: $articleId } }\n          limit: 1\n        ) {\n          uuid\n        }\n      }\n    ": types.LastCommentForArticleByIdDocument,
    "\n      query GetNewsFeedList {\n        news_feeds(order_by: { created_at: desc }) {\n          uuid\n          title\n          created_at\n        }\n      }\n    ": types.GetNewsFeedListDocument,
};

export function graphql(source: "\n      query GetArticleById($id: uuid!) {\n        article: news_feeds_by_pk(uuid: $id) {\n          uuid\n          title\n          text\n          news_comments(order_by: { created_at: desc }) {\n            uuid\n            text\n            created_at\n          }\n          created_at\n        }\n      }\n    "): (typeof documents)["\n      query GetArticleById($id: uuid!) {\n        article: news_feeds_by_pk(uuid: $id) {\n          uuid\n          title\n          text\n          news_comments(order_by: { created_at: desc }) {\n            uuid\n            text\n            created_at\n          }\n          created_at\n        }\n      }\n    "];
export function graphql(source: "\n      mutation SendComment($articleId: uuid!, $comment: String!) {\n        insert_news_comments_one(\n          object: { news_feed_uuid: $articleId, text: $comment }\n        ) {\n          uuid\n        }\n      }\n    "): (typeof documents)["\n      mutation SendComment($articleId: uuid!, $comment: String!) {\n        insert_news_comments_one(\n          object: { news_feed_uuid: $articleId, text: $comment }\n        ) {\n          uuid\n        }\n      }\n    "];
export function graphql(source: "\n      subscription LastCommentForArticleById($articleId: uuid!) {\n        news_comments(\n          order_by: { created_at: desc }\n          where: { news_feed_uuid: { _eq: $articleId } }\n          limit: 1\n        ) {\n          uuid\n        }\n      }\n    "): (typeof documents)["\n      subscription LastCommentForArticleById($articleId: uuid!) {\n        news_comments(\n          order_by: { created_at: desc }\n          where: { news_feed_uuid: { _eq: $articleId } }\n          limit: 1\n        ) {\n          uuid\n        }\n      }\n    "];
export function graphql(source: "\n      query GetNewsFeedList {\n        news_feeds(order_by: { created_at: desc }) {\n          uuid\n          title\n          created_at\n        }\n      }\n    "): (typeof documents)["\n      query GetNewsFeedList {\n        news_feeds(order_by: { created_at: desc }) {\n          uuid\n          title\n          created_at\n        }\n      }\n    "];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;