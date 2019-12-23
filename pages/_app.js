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
