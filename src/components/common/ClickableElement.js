import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ClearButton = styled.button`
    -webkit-appearance: none;
    display:inline-block;
    background:none;
    border:none;
    box-shadow:none;
    margin:0;
    padding:0;
    line-height:1;
    cursor: pointer;
`;
const ClickableElement = ({ handleClick, children }) => <ClearButton onClick={handleClick}>
    {children}
</ClearButton>;

ClickableElement.propTypes = {
    handleClick: PropTypes.func.isRequired,
};
export default ClickableElement;
