import React from 'react';
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';
import parse from 'html-react-parser';

const RichText = ({ content }) => {
    const resolver = new RichTextResolver();
    return <>{parse(resolver.render(content))}</>;
};

export default RichText;
