import Document, { Head, Main, NextScript } from 'next/document'
import * as snippet from '@segment/snippet'
import { InitializeColorMode } from 'theme-ui'

const {
  ANALYTICS_WRITE_KEY = 'enReVnqn2tVrMigdaSA5py2tRjSzlgHb',
  NODE_ENV = 'development'
} = process.env

const renderSnippet = () => {
  const opts = { apiKey: ANALYTICS_WRITE_KEY, page: true }
  if (NODE_ENV === 'development') return snippet.max(opts)
  return snippet.min(opts)
}

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
        </body>
      </html>
    )
  }
}
