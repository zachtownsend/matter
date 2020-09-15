import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageBlock = ({ onClick, active }) => {
    return (
        <AnimatePresence>
            {active && (
                <motion.span
                    onClick={onClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-black bg-opacity-50 fixed inset-0"></motion.span>
            )}
        </AnimatePresence>
    );
};

PageBlock.defaultProps = {
    active: false,
    onClick: null
};

export default PageBlock;
