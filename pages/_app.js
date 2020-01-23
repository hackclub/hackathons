import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'theme-ui'

import theme from '../components/theme'
import Meta from '../components/meta'
import NProgress from '../components/nprogress'
import Nav from '../components/nav'
import Footer from '../components/footer'

export default class extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Meta />
        <NProgress color={theme.colors.primary} />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    )
  }
}
