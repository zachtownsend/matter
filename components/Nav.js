import React, { useContext } from 'react';
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver';
import parse from 'html-react-parser';
import { StoreContext } from '../context/StoreContext';
import { default as globalData } from '../data/global.json';

const Nav = () => {
    const { toggleMenuOpen } = useContext(StoreContext);
    const { main_navigation } = globalData;
    const resolver = new RichTextResolver();
    return (
        <nav className="relative w-full h-full">
            <button
                onClick={toggleMenuOpen}
                className="absolute top-0 right-0 w-12 h-12 flex justify-center items-center">
                X
            </button>
            <h1>This is the menu</h1>
            <ul>
                {main_navigation.map((link) => (
                    <a key={link._uid} href={link.url.cached_url} target={link.target}>
                        {parse(resolver.render(link.text))}
                    </a>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
