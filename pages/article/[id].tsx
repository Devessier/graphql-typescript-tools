import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { graphql } from "../../gql";
import { makeGqlRequest } from "../../utils/request";
import invariant from "tiny-invariant";
import { useMemo, useState } from "react";
import { Client, createClient } from "graphql-ws";
import { Env } from "../../env";
import { useSubscription } from "../../utils/useSubscription";
import Link from "next/link";
import { marked } from "marked";

async function getArticleById(id: string) {
  const result = await makeGqlRequest(
    graphql(`
      query GetArticleById($id: uuid!) {
        article: news_feeds_by_pk(uuid: $id) {
          uuid
          title
          text
          news_comments(order_by: { created_at: desc }) {
            uuid
            text
            created_at
          }
          created_at
        }
      }
    `),
    { id }
  );

  return result;
}

async function sendComment({
  articleId,
  comment,
}: {
  comment: string;
  articleId: string;
}) {
  const result = await makeGqlRequest(
    graphql(`
      mutation SendComment($articleId: uuid!, $comment: String!) {
        insert_news_comments_one(
          object: { news_feed_uuid: $articleId, text: $comment }
        ) {
          uuid
        }
      }
    `),
    { articleId, comment }
  );

  return result;
}

// Create client only as there is no WebSocket implementation for Node.js.
let client: Client;
if (typeof window !== "undefined") {
  client = createClient({
    url: Env.NEXT_PUBLIC_GRAPHQL_ENDPOINT.replace("https://", "wss://"),
    async connectionParams() {
      return {
        headers:
          Env.NEXT_PUBLIC_HASURA_SECRET === ""
            ? {}
            : {
                "x-hasura-admin-secret": Env.NEXT_PUBLIC_HASURA_SECRET,
              },
      };
    },
  });
}

export default function Article() {
  const router = useRouter();
  const id = router.query.id as string;
  const [currentComment, setCurrentComment] = useState("");

  function formatIsoDate(date: string, style?: Intl.DateTimeFormatOptions['dateStyle']) {
    return new Intl.DateTimeFormat("en-US", { dateStyle: style }).format(new Date(date));
  }

  function formatMarkdown(content: string) {
    return marked.parse(content);
  }

  const { data, status } = useQuery(
    ["article", id],
    () => {
      invariant(
        typeof id === "string",
        "The page must be reached with a valid id parameter"
      );

      return getArticleById(id);
    },
    {
      enabled: typeof id === "string",
      // Set to Infinity as server will always tell us when to invalidate the query through a Subscription.
      staleTime: Infinity,
    }
  );

  useSubscription({
    client,
    query: graphql(`
      subscription LastCommentForArticleById($articleId: uuid!) {
        news_comments(
          order_by: { created_at: desc }
          where: { news_feed_uuid: { _eq: $articleId } }
          limit: 1
        ) {
          uuid
        }
      }
    `),
    // TODO: fix rerendering issues
    variables: useMemo(() => ({ articleId: id }), [id]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(() => ["article", id], [id]),
  });

  const sendCommentMutation = useMutation(sendComment, {
    onSuccess: () => {
      setCurrentComment("");
    },
  });

  function handleSubmit(event: any) {
    (event as Event).preventDefault();

    invariant(
      typeof id === "string",
      "The page must be reached with a valid id parameter"
    );

    sendCommentMutation.mutate({ articleId: id, comment: currentComment });
  }

  return (
    <div>
      {status === "loading" ? (
        <p className="px-4 sm:px-6 lg:px-8">Loading article...</p>
      ) : status === "success" && data.article != null ? (
        <div>
          <div className="px-4 sm:px-0">
            <Link href="/" className="inline-block hover:underline">
              ← Back
            </Link>
          </div>

          <header className="mt-4">
            <div className="px-4 mx-auto max-w-3xl sm:px-6 lg:px-8 space-y-2">
            <time
              dateTime={data.article.created_at}
              className="inline-block text-sm text-gray-500"
            >
              {formatIsoDate(data.article.created_at, 'full')}
            </time>
              
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {data.article.title}
              </h1>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <div className="divide-y">
                <div className="flex justify-center py-8">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(data.article.text),
                    }}
                  />
                </div>

                <div className="py-8">
                  <h2 className="text-lg font-semibold">Comments</h2>

                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="comment" className="sr-only">
                          Comment
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows={3}
                          value={currentComment}
                          onChange={({ target: { value } }) =>
                            setCurrentComment(value)
                          }
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          placeholder="Leave a comment"
                        ></textarea>
                      </div>
                      <div className="mt-6 flex items-center justify-end space-x-4">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <ul className="grid grid-cols-1 divide-y">
                  {data.article.news_comments.length > 0
                    ? data.article.news_comments.map(
                        ({ uuid, text, created_at }) => (
                          <li
                            id={`comment-${uuid}`}
                            key={uuid}
                            className="flex flex-col gap-y-2 py-4"
                          >
                            <time
                              dateTime={created_at}
                              className="inline-block mt-2 text-sm text-gray-500"
                            >
                              {formatIsoDate(created_at)}
                            </time>

                            <p className="text-gray-700">{text}</p>
                          </li>
                        )
                      )
                    : null}
                </ul>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
