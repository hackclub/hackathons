import React from 'react'
import App from 'next/app'
import { ThemeProvider, ColorMode } from 'theme-ui'
import { Global } from '@emotion/core'

import theme from '../components/theme'
import Meta from '../components/meta'
import NProgress from '../components/nprogress'
import Nav from '../components/nav'
import Footer from '../components/footer'

class Root extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Meta />
        <style>{`
          @font-face {
            font-family: 'Phantom Sans';
            src: url('https://hackclub.com/fonts/Phantom_Sans_0.4/Regular.woff')
                format('woff'),
              url('https://hackclub.com/fonts/Phantom_Sans_0.4/Regular.woff2')
                format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Phantom Sans';
            src: url('https://hackclub.com/fonts/Phantom_Sans_0.4/Bold.woff')
                format('woff'),
              url('https://hackclub.com/fonts/Phantom_Sans_0.4/Bold.woff2')
                format('woff2');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        <ThemeProvider theme={theme}>
          <ColorMode />
          <Global styles={theme => ({ body: theme.styles.root })} />
          <NProgress color={theme.colors.nav} />
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </>
    )
  }
}

export default Root
