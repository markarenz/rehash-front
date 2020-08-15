import React from 'react';
import styled from 'styled-components';
import { Container, Grid } from '@material-ui/core';
import { pageStyle } from "../config";

const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg.gif);
    background-size: 1024px;
    background-repeat:repeat;
    image-rendering: pixelated;
`;
const StyledPage = styled.div`${pageStyle}
    color:white;
`;
const StyledTitle = styled.div`
    margin-bottom:30px;
    h1{
        font-size: 20vw;
        margin:0;
        padding:0;
        line-height:1;
        color:white;
    }
    h2{
        font-size: 4vw;
        margin:0;
        padding:0;
        line-height:1;
        text-transform:uppercase;
        color:white;
    }
`;

const TopContent = styled(Container)`
    position:relative;
`;
//?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ
const FourOhFour = () => {
    return (
        <StyledMain>
            <StyledPage>
                <TopContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align="center">
                            <StyledTitle>
                                <h1>404</h1>
                                <h2>Page not found</h2>
                            </StyledTitle>
                            <p>
                                The resource you're looking for could not be found. That's sad. I feel for you. But cheer up! All you need to do is click on the logo to go back to the main feed or use any other navigation button to head someplace else.
                            </p>
                            <p>
                                You can do this! We'll get through this together.
                            </p>
                            <p></p>
                        </Grid>
                    </Grid>
                </TopContent>
            </StyledPage>
        </StyledMain>
    )
};

export default FourOhFour;
