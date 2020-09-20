import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import StoryblokService from '../lib/storyblok-service';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}';`
                        }}></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
