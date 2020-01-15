import Document, { Head, Main, NextScript } from 'next/document'
import * as snippet from '@segment/snippet'
import { extractCritical } from 'emotion-server'

const {
  ANALYTICS_WRITE_KEY = 'enReVnqn2tVrMigdaSA5py2tRjSzlgHb',
  NODE_ENV = 'development'
} = process.env

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  renderSnippet() {
    const opts = { apiKey: ANALYTICS_WRITE_KEY, page: true }
    if (NODE_ENV === 'development') return snippet.max(opts)
    return snippet.min(opts)
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
