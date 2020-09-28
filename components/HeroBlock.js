import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';
import parse from 'html-react-parser';

const HeroBlock = ({ blok }) => {
    const resolver = new RichTextResolver();
    return (
        <SbEditable content={blok}>
            <div
                className={`relative w-full h-screen flex justify-${blok.content_position_h} items-${blok.content_position_v} text-${blok.content_color} p-12`}
                style={{ height: parseInt(blok.banner_height_desktop, 10) }}>
                <img
                    src={blok.image.filename}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
                <div className={`z-10 relative text-${blok.content_alignment}`}>
                    {parse(resolver.render(blok.content))}
                    <a href={blok.cta_href.cached_url} target={blok.cta_target}>
                        {blok.cta_text}
                    </a>
                </div>
            </div>
        </SbEditable>
    );
};

export default HeroBlock;
