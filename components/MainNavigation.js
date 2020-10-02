import React from 'react';
import RichText from './RichText';

const MainNavigation = ({ links }) => {
    return (
        <ul>
            {links.map((link) => (
                <a key={link._uid} href={link.url.cached_url} target={link.target}>
                    <RichText content={link.text} />
                </a>
            ))}
        </ul>
    );
};

export default MainNavigation;
