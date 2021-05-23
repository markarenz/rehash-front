import React from 'react';
import styled from 'styled-components';
import { colors, breakPoints } from '../../config';
import { Link } from 'react-router-dom';
import { Grid, Container } from '@material-ui/core';
// import {
//     GoogleAds,
// } from '../../components';

const StyledFooter = styled.div`
    border-top:4px solid ${colors.blueLight};
    box-shadow:0 0 20px rgba(0,0,0,.5);
    position:relative;
    font-size: 20px;
    background: red;
    a{
        color: white;
    }
    img{
        width:100%;
        height:auto;
    }
    ul{
        padding:0;
        li{
            line-height:2;
            list-style-position:inside;
        }
    }
`;


const ChuckAndJane = styled.img`
    max-width:140px;
`;
const FooterMain = styled.div`
    padding: 30px 0;
    color: white;
    background-color: ${colors.blueGrey};
    a{
        display:inline-block;
        text-decoration:none;
        transition: .25s all ease-out;
        transform: scale(1);
        transform-origin: 0% 50%;
        &:hover{
            transform: scale(1.2);
            color: ${colors.orange};
        }
    }
`;
const Copyright = styled.div`
    padding: 20px 0;
    font-size: 14px;
    background-color: ${colors.greyDarker};
    color: white;
    
`;
const StyledGrid = styled(Grid)`
    align-items: center;
    @media (max-width: ${breakPoints.header}px) {
        display:block;
        text-align:center;
    }
`;
const FooterLogo = styled.img`
    max-width:130px;
`;
const BetaDiclaimer = styled.div`
    background: ${colors.blueDark};
    font-size:14px;
    font-style: italic;
    color: white;
    padding:20px;
    a{
        text-decoration:none;
        font-weight:bold;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <FooterMain>
                <Container>
                    <StyledGrid container spacing={6}>
                        <Grid item xs={12} sm={2} align="center">
                            <FooterLogo src="/images/rehash-logo-mark-white.svg" alt="Plagiarista" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>
                                Re:hash is a platform for remixing classic (public domain) works into somrthing new and exciting.
                            </p>
                            <p>
                                <i>
                                    Express yourself. Have a laugh. Remix. Share. Enjoy.
                                </i>
                            </p>
                        </Grid>
                        <StyledGrid item xs={12} sm={2}>
                            <p>
                                <Link to="/contact">Contact</Link>
                            </p>
                            <p>
                                <Link to="/terms-of-service">Terms of Service</Link>
                            </p>
                            <p>
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </p>
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={2}>
                           <ChuckAndJane src="/images/authors.svg" alt="Chuck and Jane" />
                        </StyledGrid>
                        {/*<Grid item xs={12} align="center">*/}
                        {/*    <GoogleAds slot="2010356211" />*/}
                        {/*</Grid>*/}
                    </StyledGrid>
                </Container>
            </FooterMain>
            <BetaDiclaimer>
                <Grid container spacing={3}>
                    <Grid item xs={12} align="center">
                        Note: Re:hash is currently in "beta." This means things work, mostly. If you have an issue
                        {' '}<a
                            href="https://twitter.com/Re_hash_app"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                            Tweet @ us.
                        </a>
                    </Grid>
                </Grid>
            </BetaDiclaimer>
            <Copyright>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align="center">
                            &copy;{new Date().getFullYear()} Mark Arenz / <a href="https://www.markmakesstuff.com" target="_blank" rel="noopener noreferrer">MarkMakesStuff.com</a>
                        </Grid>
                    </Grid>
                </Container>
            </Copyright>
        </StyledFooter>
    )
};

export default Footer;
