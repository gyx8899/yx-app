import React from 'react';
import ReactDOM from 'react-dom';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {site, author} from '../site/config';

import PageChange from '../app/components/PageChange/PageChange.js';

import '../app/assets/scss/nextjs-material-kit.scss?v=1.0.0';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition'),
  );
});
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

const {
title, description, keywords, themeColor, gaTrackingId,
} = site.header;

export default class MyApp extends App {
  componentDidMount() {

  }

  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author.name} />
          <link rel="shortcut icon" href="/images/favicon.ico" type="image/ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content={themeColor} />
          <meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          {/* {<!-- Status Bar Style -->} */}
          {/* {<!-- Safari: black, black-translucent -->} */}
          <meta name="apple-mobile-web-app-status-bar-style" content="yes" />
          {/* {<!-- Chrome, Firefox OS and Opera -->} */}
          <meta name="theme-color" content={themeColor} />
          {
            gaTrackingId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
          }
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
