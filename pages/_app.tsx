import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Link from "next/link";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-full">
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-shrink-0 items-center py-4">
              <Link href="/" className="text-4xl font-bold">
                News app
              </Link>
            </div>
          </div>
        </div>

        <div className="py-10">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
