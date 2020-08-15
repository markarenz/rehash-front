import React from 'react';
import styled, { keyframes } from 'styled-components';
import {breakPoints} from "../../config";
import PropTypes from 'prop-types';

const StyledLogoWrap = styled.div`
        position:relative;
`;
const StyledLogo = styled.svg`
        padding: 0;
        width: ${props => props.size === 'small' ? '200px' : '35vw'};
        min-width: ${props => props.size === 'small' ? '200px' : '300px'};
        height:auto;
        @media (max-width: ${breakPoints.header}px) {
            width:200px;
        }
`;
const KfArrowRot = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
`;
const KfWink = keyframes`
        0% {
            transform: scale(1.0, 1.0);
        }
        50% {
            transform: scale(1.0, 0);
        }
        100% {
            transform: scale(1.0, 1.0);
        }
`;
const PathEyeL = styled.path`
        fill: white;
`;
const PathEyeR = styled.path`
        fill: white;
        animation-name: ${KfWink};
        animation-duration: 0.3s;
        animation-delay: 0.5s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
        transform-origin: 80% 50%;        
`;
const BanditMask = styled.path`
    fill: #333;
`;
const PathArrow = styled.path`
        fill: #333;
        animation-duration: 1s;
        animation-iteration-count: ${props => props.repeatAnimation ? 'infinite' : '1'};
        animation-timing-function: ease-in-out;
        animation-delay: 0.0s;
        transform-origin: 50% 51%;
`;
const PathArrowT = styled(PathArrow)`
        animation-name: ${KfArrowRot};
`;
const PathArrowB = styled(PathArrow)`
        animation-name: ${KfArrowRot};
`;

const Loading = ({ repeatAnimation, size }) => <StyledLogoWrap>
    <StyledLogo
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 247 249"
        size={size}
    >
        <BanditMask
            d="M167.63,87.39c-17.64,0-22.36,6-44.53,6.22-22.17-.22-26.88-6.22-44.52-6.22-18,0-47.42,13.17-47.42,39s12.21,39,38.08,39,50.53-22.76,50.53-22.76a3.34,3.34,0,0,1,.23-.5,10.23,10.23,0,0,1,3.1-1.44,10.23,10.23,0,0,1,3.1,1.44,3.34,3.34,0,0,1,.23.5S151.1,165.47,177,165.47s38.08-13.18,38.08-39S185.59,87.39,167.63,87.39Z"
        />
        <PathEyeL
            d="M104.28,126.84s-5.67-10.78-21.31-12a34.22,34.22,0,0,0-24.75,8.06s4.62,10.26,21,11.81C97.74,136.42,104.28,126.84,104.28,126.84Z"
        />
        <PathEyeR
            d="M139.77,127.87s5.66-10.78,21.31-12.06a34.26,34.26,0,0,1,24.75,8.06s-4.62,10.27-21,11.82C146.31,137.45,139.77,127.87,139.77,127.87Z"
        />
        <PathArrowT
            repeatAnimation={repeatAnimation}
            d="M163.93,202.47,176.27,217l2.9-36.08L143.09,178l12.43,14.6a52,52,0,0,1-73.08-6L72.56,195A65,65,0,0,0,163.93,202.47Z"
        />
        <PathArrowB
            repeatAnimation={repeatAnimation}
            d="M87.8,46.89,75.46,32.4l-2.9,36.08,36.08,2.9L96.21,56.77a52,52,0,0,1,73.08,6l9.88-8.41A65,65,0,0,0,87.8,46.89Z"
        />
    </StyledLogo>
</StyledLogoWrap>

Loading.propTypes = {
    repeatAnimation: PropTypes.bool,
    size: PropTypes.string,
};
export default Loading;
