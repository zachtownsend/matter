import React from 'react';
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';
import parse from 'html-react-parser';

const MainNavigation = ({ links }) => {
    const resolver = new RichTextResolver();
    return (
        <ul>
            {links.map((link) => (
                <a key={link._uid} href={link.url.cached_url} target={link.target}>
                    {parse(resolver.render(link.text))}
                </a>
            ))}
        </ul>
    );
};

export default MainNavigation;
