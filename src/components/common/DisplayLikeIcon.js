import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';
import {FavoriteBorder as IconLike, FavoriteTwoTone as IconLiked} from "@material-ui/icons";
import {colors} from "../../config";

const IconLikeGeneralStyle = `
    &.MuiSvgIcon-root{
        width:50px;
        height:50px;
        font-size:50px;
    }
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
`;
const StyledIconLiked = styled(IconLiked)`
    ${IconLikeGeneralStyle}
    animation-name: ${props => props.init === 'y' ? likedAnim : null};
    color: ${colors.red}
`;
const StyledIconLike = styled(IconLike)`
    ${IconLikeGeneralStyle}
    animation-name: ${props => props.init === 'y' ? unlikedAnim : null};
    color: ${colors.greyDark}
`;
const likedAnim = keyframes`
        0% {
            transform: scale(1.0, 1.0);
        }
        25% {
            transform: scale(.3, .3);
        }
        50% {
            transform: scale(1.2, 1.2);
        }
        100% {
            transform: scale(1.0, 1.0);
        }
    `;
const unlikedAnim = keyframes`
        0% {
            transform: translateX(0);
        }
        15% {
            transform: translateX(-7px);
        }
        30% {
            transform: translateX(7px);
        }
        45% {
            transform: translateX(-7px);
        }
        60% {
            transform: translateX(7px);
        }
        75% {
            transform: translateX(-7px);
        }
        100% {
            transform: translateX(0);
        }
    `;


const DisplayLikeIcon = ({ isFaved, likeInitted}) => {
    if (isFaved) return <StyledIconLiked init={likeInitted}/>
    return <StyledIconLike init={likeInitted}/>;
}

DisplayLikeIcon.propTypes = {
    isFaved: PropTypes.bool,
    likeInitted: PropTypes.string,
};

export default DisplayLikeIcon;
