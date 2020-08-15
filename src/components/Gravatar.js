import React from 'react';
import PropTypes from 'prop-types';
const md5 = require('md5');

const Gravatar = ({ email, name, size }) => {
    const hash = md5(email.toLowerCase().trim());
    return (
        <img src={`https://www.gravatar.com/avatar/${hash}s=${size}`} alt={name} style={{ width: size, height: size }}/>
    )
};

Gravatar.propTypes = {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};

export default Gravatar;
