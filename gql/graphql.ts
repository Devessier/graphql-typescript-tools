/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert data into the table: "news_comments" */
  insert_news_comments?: Maybe<News_Comments_Mutation_Response>;
  /** insert a single row into the table: "news_comments" */
  insert_news_comments_one?: Maybe<News_Comments>;
};


/** mutation root */
export type Mutation_RootInsert_News_CommentsArgs = {
  objects: Array<News_Comments_Insert_Input>;
  on_conflict?: InputMaybe<News_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_News_Comments_OneArgs = {
  object: News_Comments_Insert_Input;
  on_conflict?: InputMaybe<News_Comments_On_Conflict>;
};

/** columns and relationships of "news_comments" */
export type News_Comments = {
  __typename?: 'news_comments';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  news_feed: News_Feeds;
  news_feed_uuid: Scalars['uuid'];
  text: Scalars['String'];
  uuid: Scalars['uuid'];
};

/** order by aggregate values of table "news_comments" */
export type News_Comments_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<News_Comments_Max_Order_By>;
  min?: InputMaybe<News_Comments_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "news_comments". All fields are combined with a logical 'AND'. */
export type News_Comments_Bool_Exp = {
  _and?: InputMaybe<Array<News_Comments_Bool_Exp>>;
  _not?: InputMaybe<News_Comments_Bool_Exp>;
  _or?: InputMaybe<Array<News_Comments_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  news_feed?: InputMaybe<News_Feeds_Bool_Exp>;
  news_feed_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
  uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "news_comments" */
export enum News_Comments_Constraint {
  /** unique or primary key constraint on columns "uuid" */
  NewsCommentsPkey = 'news_comments_pkey'
}

/** input type for inserting data into table "news_comments" */
export type News_Comments_Insert_Input = {
  news_feed_uuid?: InputMaybe<Scalars['uuid']>;
  text?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "news_comments" */
export type News_Comments_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  news_feed_uuid?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "news_comments" */
export type News_Comments_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  news_feed_uuid?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "news_comments" */
export type News_Comments_Mutation_Response = {
  __typename?: 'news_comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<News_Comments>;
};

/** on_conflict condition type for table "news_comments" */
export type News_Comments_On_Conflict = {
  constraint: News_Comments_Constraint;
  update_columns?: Array<News_Comments_Update_Column>;
  where?: InputMaybe<News_Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "news_comments". */
export type News_Comments_Order_By = {
  created_at?: InputMaybe<Order_By>;
  news_feed?: InputMaybe<News_Feeds_Order_By>;
  news_feed_uuid?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** select columns of table "news_comments" */
export enum News_Comments_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  NewsFeedUuid = 'news_feed_uuid',
  /** column name */
  Text = 'text',
  /** column name */
  Uuid = 'uuid'
}

/** Streaming cursor of the table "news_comments" */
export type News_Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: News_Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type News_Comments_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  news_feed_uuid?: InputMaybe<Scalars['uuid']>;
  text?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['uuid']>;
};

/** placeholder for update columns of table "news_comments" (current role has no relevant permissions) */
export enum News_Comments_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** columns and relationships of "news_feeds" */
export type News_Feeds = {
  __typename?: 'news_feeds';
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  news_comments: Array<News_Comments>;
  text: Scalars['String'];
  title: Scalars['String'];
  uuid: Scalars['uuid'];
};


/** columns and relationships of "news_feeds" */
export type News_FeedsNews_CommentsArgs = {
  distinct_on?: InputMaybe<Array<News_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Comments_Order_By>>;
  where?: InputMaybe<News_Comments_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "news_feeds". All fields are combined with a logical 'AND'. */
export type News_Feeds_Bool_Exp = {
  _and?: InputMaybe<Array<News_Feeds_Bool_Exp>>;
  _not?: InputMaybe<News_Feeds_Bool_Exp>;
  _or?: InputMaybe<Array<News_Feeds_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  news_comments?: InputMaybe<News_Comments_Bool_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Ordering options when selecting data from "news_feeds". */
export type News_Feeds_Order_By = {
  created_at?: InputMaybe<Order_By>;
  news_comments_aggregate?: InputMaybe<News_Comments_Aggregate_Order_By>;
  text?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** select columns of table "news_feeds" */
export enum News_Feeds_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Text = 'text',
  /** column name */
  Title = 'title',
  /** column name */
  Uuid = 'uuid'
}

/** Streaming cursor of the table "news_feeds" */
export type News_Feeds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: News_Feeds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type News_Feeds_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['uuid']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  news_comments: Array<News_Comments>;
  /** fetch data from the table: "news_comments" using primary key columns */
  news_comments_by_pk?: Maybe<News_Comments>;
  /** fetch data from the table: "news_feeds" */
  news_feeds: Array<News_Feeds>;
  /** fetch data from the table: "news_feeds" using primary key columns */
  news_feeds_by_pk?: Maybe<News_Feeds>;
};


export type Query_RootNews_CommentsArgs = {
  distinct_on?: InputMaybe<Array<News_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Comments_Order_By>>;
  where?: InputMaybe<News_Comments_Bool_Exp>;
};


export type Query_RootNews_Comments_By_PkArgs = {
  uuid: Scalars['uuid'];
};


export type Query_RootNews_FeedsArgs = {
  distinct_on?: InputMaybe<Array<News_Feeds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Feeds_Order_By>>;
  where?: InputMaybe<News_Feeds_Bool_Exp>;
};


export type Query_RootNews_Feeds_By_PkArgs = {
  uuid: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  news_comments: Array<News_Comments>;
  /** fetch data from the table: "news_comments" using primary key columns */
  news_comments_by_pk?: Maybe<News_Comments>;
  /** fetch data from the table in a streaming manner: "news_comments" */
  news_comments_stream: Array<News_Comments>;
  /** fetch data from the table: "news_feeds" */
  news_feeds: Array<News_Feeds>;
  /** fetch data from the table: "news_feeds" using primary key columns */
  news_feeds_by_pk?: Maybe<News_Feeds>;
  /** fetch data from the table in a streaming manner: "news_feeds" */
  news_feeds_stream: Array<News_Feeds>;
};


export type Subscription_RootNews_CommentsArgs = {
  distinct_on?: InputMaybe<Array<News_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Comments_Order_By>>;
  where?: InputMaybe<News_Comments_Bool_Exp>;
};


export type Subscription_RootNews_Comments_By_PkArgs = {
  uuid: Scalars['uuid'];
};


export type Subscription_RootNews_Comments_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<News_Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<News_Comments_Bool_Exp>;
};


export type Subscription_RootNews_FeedsArgs = {
  distinct_on?: InputMaybe<Array<News_Feeds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<News_Feeds_Order_By>>;
  where?: InputMaybe<News_Feeds_Bool_Exp>;
};


export type Subscription_RootNews_Feeds_By_PkArgs = {
  uuid: Scalars['uuid'];
};


export type Subscription_RootNews_Feeds_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<News_Feeds_Stream_Cursor_Input>>;
  where?: InputMaybe<News_Feeds_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type GetArticleByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetArticleByIdQuery = { __typename?: 'query_root', article?: { __typename?: 'news_feeds', uuid: string, title: string, text: string, created_at: string, news_comments: Array<{ __typename?: 'news_comments', uuid: string, text: string, created_at: string }> } | null };

export type SendCommentMutationVariables = Exact<{
  articleId: Scalars['uuid'];
  comment: Scalars['String'];
}>;


export type SendCommentMutation = { __typename?: 'mutation_root', insert_news_comments_one?: { __typename?: 'news_comments', uuid: string } | null };

export type LastCommentForArticleByIdSubscriptionVariables = Exact<{
  articleId: Scalars['uuid'];
}>;


export type LastCommentForArticleByIdSubscription = { __typename?: 'subscription_root', news_comments: Array<{ __typename?: 'news_comments', uuid: string }> };

export type GetNewsFeedListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsFeedListQuery = { __typename?: 'query_root', news_feeds: Array<{ __typename?: 'news_feeds', uuid: string, title: string, created_at: string }> };


export const GetArticleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"article"},"name":{"kind":"Name","value":"news_feeds_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"news_comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<GetArticleByIdQuery, GetArticleByIdQueryVariables>;
export const SendCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_news_comments_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"news_feed_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<SendCommentMutation, SendCommentMutationVariables>;
export const LastCommentForArticleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LastCommentForArticleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news_comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"news_feed_uuid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<LastCommentForArticleByIdSubscription, LastCommentForArticleByIdSubscriptionVariables>;
export const GetNewsFeedListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNewsFeedList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news_feeds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<GetNewsFeedListQuery, GetNewsFeedListQueryVariables>;