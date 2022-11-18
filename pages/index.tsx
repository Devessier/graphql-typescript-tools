import { useQuery } from "react-query";
import { makeGqlRequest } from "../utils/request";
import { graphql } from "../gql";
import Link from "next/link";

async function getNewsFeedList() {
  const result = await makeGqlRequest(
    graphql(`
      query GetNewsFeedList {
        news_feeds(order_by: { created_at: desc }) {
          uuid
          title
          created_at
        }
      }
    `)
  );

  return result;
}

export default function Home() {
  const { data, status } = useQuery(["news_feeds"], getNewsFeedList);

  function formatIsoDate(date: string) {
    return new Intl.DateTimeFormat("en-US").format(new Date(date));
  }

  return (
    <div>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-0">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            All news
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl">
          <div className="px-4 py-12 sm:px-0">
            {status === "loading" ? (
              <p>Loading news...</p>
            ) : status === "success" ? (
              <ul className="space-y-6">
                {data.news_feeds.map(({ uuid, title, created_at }) => (
                  <li key={uuid}>
                    <Link
                      href={`/article/${uuid}`}
                      // className="flex flex-col"
                      className="block"
                    >
                      <h2 className="font-medium text-gray-900">{title}</h2>

                      <time
                        dateTime={created_at}
                        className="inline-block mt-2 text-sm text-gray-500"
                      >
                        {formatIsoDate(created_at)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Error</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
