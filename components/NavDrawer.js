import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreContext } from '../context/StoreContext';

const NavDrawer = ({ open }) => {
    const { toggleMenuOpen } = useContext(StoreContext);

    return (
        <AnimatePresence>
            {open && (
                <motion.nav
                    animate={{ x: 0 }}
                    initial={{ x: '-100%' }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.4, type: 'just' }}
                    className="fixed w-64 h-full top-0 left-0 bg-white">
                    <button
                        onClick={toggleMenuOpen}
                        className="absolute top-0 right-0 w-12 h-12 flex justify-center items-center">
                        X
                    </button>
                    <h1>This is the menu</h1>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default NavDrawer;
