import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Drawer = ({ open, children, side }) => {
    const classNames = `fixed w-64 h-full top-0 ${side}-0 bg-white`;
    const fromPosition = { x: `${side === 'left' ? '-' : ''}100%` };
    const toPosition = { x: 0 };
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    animate={toPosition}
                    initial={fromPosition}
                    exit={fromPosition}
                    transition={{ duration: 0.4, type: 'just' }}
                    className={classNames}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Drawer.defaultProps = {
    open: false,
    side: 'left'
};

export default Drawer;
