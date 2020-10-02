import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import MainNavigation from './MainNavigation';
import { main_navigation } from '../data/globalData';

const Nav = () => {
    const { toggleMenuOpen } = useContext(StoreContext);
    return (
        <nav className="relative w-full h-full">
            <button
                onClick={toggleMenuOpen}
                className="absolute top-0 right-0 w-12 h-12 flex justify-center items-center">
                X
            </button>
            <h1>This is the menu</h1>
            <MainNavigation links={main_navigation} />
        </nav>
    );
};

export default Nav;
