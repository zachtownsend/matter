import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { getCachedData } from '../lib/helpers';
import MainNavigation from './MainNavigation';

const Nav = () => {
    const { toggleMenuOpen } = useContext(StoreContext);
    const globalData = getCachedData('test');
    console.log(globalData);
    return (
        <nav className="relative w-full h-full">
            <button
                onClick={toggleMenuOpen}
                className="absolute top-0 right-0 w-12 h-12 flex justify-center items-center">
                X
            </button>
            <h1>This is the menu</h1>
            {globalData.main_navigation && <MainNavigation links={globalData.main_navigation} />}
        </nav>
    );
};

export default Nav;
