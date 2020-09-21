import React from 'react';
import Head from 'next/head';

import Footer from './Footer';
import Header from './Header';
import StoryblokService from '../lib/storyblok-service';

export const Layout = ({ children, title = 'This is a default title' }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
            {StoryblokService.bridge()}
        </div>
    );
};
