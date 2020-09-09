import React from 'react';
import Head from 'next/head';

import Footer from './Footer';

export const Layout = ({ children, title = 'This is a default title' }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
            <Footer />
        </div>
    );
};
