import React from 'react';
import SbEditable from 'storyblok-react';
import RichText from './RichText';

const HeroBlock = ({ blok }) => {
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
                    <RichText content={blok.content} />
                </div>
            </div>
        </SbEditable>
    );
};

export default HeroBlock;
