import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextApp from 'next/app'
import Head from 'next/head'

import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import * as Fathom from 'fathom-client'
import NProgress from '../components/nprogress'
import Nav from '../components/nav'
import Footer from '../components/footer'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('JEODBBBP', { includedDomains: ['hackathons.hackclub.com'] })
    const onRouteChangeComplete = () => Fathom.trackPageview()
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Meta
        as={Head}
        title="Hack Club Hackathons"
        name="Hack Club Hackathons"
        description="Listing of upcoming high school hackathons around the world."
        image="https://hackathons.hackclub.com/card.png"
      />
      <NProgress color={theme.colors.primary} />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}

export default App
