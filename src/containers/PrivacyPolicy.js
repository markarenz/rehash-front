import React from 'react';
import { Container, Grid } from "@material-ui/core";
import { pageStyle } from "../config";
import styled from 'styled-components';


const StyledPage = styled.div`${pageStyle}`;
const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg.gif);
    background-size: 1024px;
    background-repeat:repeat;
    image-rendering: pixelated;   
    color:white; 
`;
const StyledH2 = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: bold;
`;


const PrivacyPolicy = () => {
    return (<StyledMain>
        <StyledPage>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Privacy Policy</h1>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <StyledH2>Your privacy is important to us.</StyledH2>
                        <p>
                            It is Re:hash's policy to respect your privacy regarding any information we may collect from you across our website, https://rehash.ridiculopathy.com, and other sites we own and operate.
                        </p>
                        <p>
                            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                        </p>
                        <p>
                            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                        </p>
                        <p>
                            We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                        </p>
                        <p>
                            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                        </p>
                        <p>
                            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
                        </p>
                        <p>
                            Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
                        </p>
                        <p>
                            This policy is effective as of 11 August 2020.
                        </p>

                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </Container>
        </StyledPage>
    </StyledMain>);
};

export default PrivacyPolicy;
