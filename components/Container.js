import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children, tag }) => {
    const Tag = tag;
    return (
        <Tag className="container mx-auto">
            {children}
        </Tag>
    )
}

Container.propTypes = {
    tag: PropTypes.string
}

Container.defaultProps = {
    tag: 'div'
};

export default Container;

