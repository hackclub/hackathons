import Document, { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

const fontFaceCss = `
@font-face {
  font-family: 'Zarathustra';
  src: url('/fonts/zarathustra-kerned.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zarathustra';
  src: url('/fonts/zarathustra-v01.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/zarathustra-kerned.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/zarathustra-v01.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <style dangerouslySetInnerHTML={{ __html: fontFaceCss }} />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
