import React from 'react';
import client from '../../lib/apollo';
import { gql } from '@apollo/client';
import StoryblokService from '../../lib/storyblok-service';

const ProductSetPage = ({ set, shop }) => {
    return (
        <main>
            <h1>{set.name}</h1>
        </main>
    );
};

export async function getStaticPaths() {
    const sets = await StoryblokService.get(`cdn/stories`, {
        cv: Date.now(),
        starts_with: 'sets'
    });

    return {
        paths: sets.data.stories.map((page) => ({ params: { handle: page.slug } })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { handle } = params;
    const { data } = await client.query({
        query: gql`
            query {
                shop {
                    moneyFormat
                }
            }
        `
    });

    let set;

    try {
        set = await StoryblokService.get(`cdn/stories/sets/${handle}`, {
            cv: Date.now()
        });
    } catch (error) {
        set = [];
    }

    return {
        props: {
            set: set.data.story,
            shop: data.shop
        }
    };
}

export default ProductSetPage;
