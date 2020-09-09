import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, tag, className }) => {
    const Tag = tag;
    const mergedClassNames = className
        ? ['container mx-auto', className].join(' ').trim()
        : 'container mx-auto';
    return <Tag className={mergedClassNames}>{children}</Tag>;
};

Container.propTypes = {
    tag: PropTypes.string
};

Container.defaultProps = {
    tag: 'div'
};

export default Container;
