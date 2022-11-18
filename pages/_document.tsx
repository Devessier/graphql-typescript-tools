import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='h-full bg-white'>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <body className='h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
