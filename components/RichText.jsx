import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import StoryblokService from '../lib/storyblok-service';
import parse from 'html-react-parser';
import Cta from './Cta';

const Storyblok = StoryblokService.client;

Storyblok.setComponentResolver((component, blok) => {
    switch (component) {
        case 'CTA':
            return renderToStaticMarkup(<Cta blok={blok} />);
    }
});

const RichText = ({ content }) => {
    return <>{parse(Storyblok.richTextResolver.render(content))}</>;
};

export default RichText;
