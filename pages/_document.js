import Document, { Head, Main, NextScript } from 'next/document'
import * as snippet from '@segment/snippet'
import { InitializeColorMode } from 'theme-ui'

const {
  ANALYTICS_WRITE_KEY = 'enReVnqn2tVrMigdaSA5py2tRjSzlgHb',
  NODE_ENV = 'development'
} = process.env

const phantomSans = `
  @font-face {
    font-family: 'Phantom Sans';
    src: url('https://hackclub.com/fonts/Phantom_Sans_0.6/Regular.woff')
        format('woff'),
      url('https://hackclub.com/fonts/Phantom_Sans_0.6/Regular.woff2')
        format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Phantom Sans';
    src: url('https://hackclub.com/fonts/Phantom_Sans_0.6/Bold.woff')
        format('woff'),
      url('https://hackclub.com/fonts/Phantom_Sans_0.6/Bold.woff2')
        format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  renderSnippet() {
    const opts = { apiKey: ANALYTICS_WRITE_KEY, page: true }
    if (NODE_ENV === 'development') return snippet.max(opts)
    return snippet.min(opts)
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
          <style dangerouslySetInnerHTML={{ __html: phantomSans }} />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
        </body>
      </html>
    )
  }
}
