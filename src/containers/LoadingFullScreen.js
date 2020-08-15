import React from 'react';
import { Loading } from '../components';
import styled from 'styled-components';
import { colors } from '../config';


const StyledLoadWrap = styled.div`
    background-color: ${colors.blueLight};
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;
const LoadingFullScreen = () => <StyledLoadWrap>
    <Loading />
</StyledLoadWrap>;

export default LoadingFullScreen;
