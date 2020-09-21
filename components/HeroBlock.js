import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';
import parse from 'html-react-parser';

const HeroBlock = ({ blok }) => {
    const resolver = new RichTextResolver();
    return (
        <SbEditable content={blok}>
            <div className="relative w-full h-screen">
                <img
                    src={blok.image.filename}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
                <div className="z-10 relative">
                    {parse(resolver.render(blok.content))}
                    <a href={blok.button_url.cached_url}>{blok.button_text}</a>
                </div>
            </div>
        </SbEditable>
    );
};

export default HeroBlock;
