import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const H2Styled = styled.h2`
    position: relative;
    font-size: 26px;
    z-index: 1;
    overflow: hidden;
    text-align: center;    
    margin:0 0 20px 0;
    &:before {
        margin-left: -50%;
        text-align: right;
    }
    &:before,
    &:after {
        position: absolute;
        top: 51%;
        overflow: hidden;
        width: 50%;
        height: 1px;
        content: '\a0';
        background-color: white;
    }
    span{
        padding: 0 14px;
        border-left: 1px solid white;
        border-right: 1px solid white;
    }
`;

const Headline2 = ({ title }) => <H2Styled>
    <span>
    {title}
    </span>
</H2Styled>;

Headline2.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Headline2;
