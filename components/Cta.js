import React from 'react';
import ReactMarkdown from 'react-markdown';
import SbEditable from 'storyblok-react';

const Cta = ({ blok }) => {
    return (
        <SbEditable content={blok}>
            <a
                className="px-4 py-2 mt-2 block w-auto text-center bg-green-400"
                href={blok.url.cached_url}
                target={blok.target}>
                <ReactMarkdown
                    children={blok.text}
                    disallowedTypes={['paragraph']}
                    unwrapDisallowed
                />
            </a>
        </SbEditable>
    );
};

export default Cta;
