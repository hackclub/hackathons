import React from 'react'
import Head from 'next/head'
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
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0"; analytics.load("enReVnqn2tVrMigdaSA5py2tRjSzlgHb"); analytics.page(); }}();`
            }}
          />
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
        </Head>
        <ThemeProvider theme={theme}>
          <ColorMode />
          <Global styles={theme => ({ body: theme.styles.root })} />
          <NProgress color={theme.colors.primary} />
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </>
    )
  }
}

export default Root
