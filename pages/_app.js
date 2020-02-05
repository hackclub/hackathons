import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import { ThemeProvider } from 'theme-ui'

import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../components/theme'
import NProgress from '../components/nprogress'
import Nav from '../components/nav'
import Footer from '../components/footer'

export default class extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <Meta
            title="Hack Club Hackathons"
            name="Hack Club Hackathons"
            description="Listing of upcoming high school hackathons around the world."
            image="https://hackathons.hackclub.com/card.png"
          />
          <title>Hack Club Hackathons</title>
        </Head>
        <NProgress color={theme.colors.primary} />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    )
  }
}
