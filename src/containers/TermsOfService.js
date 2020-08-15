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

const StyledHr = styled.hr`
    padding:0;
    margin:50px auto;
    border-top:1px dashed white;
    border-bottom:none;
    border-left:none;
    border-right:none; 
    width:50%;
`;
const TermsOfService = () => {
    return (<StyledMain>
        <StyledPage>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Terms of Service</h1>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>

                        <StyledH2>
                            Notice of Terms
                        </StyledH2>

                        <p>
                            By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            User Generated Content
                        </StyledH2>

                        <p>
                            Content created on the platform by users belongs to the Site. It's perfectly OK to reproduce your work somewhere else within limits. As long as it is cited properly as it is on the main Re:hash platform, you're fine. Giving credit to the original authors who crafted that one or two word phrase you clipped is part of the fun and without that, who are we, really?
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Age Limit
                        </StyledH2>

                        <p>
                            If you are under 18, get out. Now. Stop reading and close the tab. The content on the site should be generally safe for young people, and we'd all love to get young ones excited about old books - but we cannot legally allow participation of users below the age of 18. Full stop. End of paragraph.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Accuracy
                        </StyledH2>

                        <p>
                            This site and its components are offered for informational purposes only; this site shall not be responsible or liable for the accuracy, usefulness or availability of any information transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Source Content
                        </StyledH2>
                        <p>
                            All source content comes from works submitted to the Gutenberg Project. The intent is to only use public domain works to avoid time-wasting complaints and other nuisances. If you find that a source is not in the public domain, you can contact us at rehash@ridiculopathy.com. Be specific. We may not reply but know that we thank you in our hearts.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Don't be a jerk
                        </StyledH2>
                        <p>
                            The platform was created to make abuse or trolling difficult, but it's certainly not impossible. We are not responsible for people mixing and matching posts in a way that you find offensive. If we need to ban someone, we definitely will.
                        </p>

                        <p>
                            We reserve the right to ban you or phantom ban your account for any reason whatsoever and we are under no obligation to notify the user in such a case. So, if you're noticing reduced engagement with your content, this may be the case. There is no need to start a support ticket (there is no tech support) or file an appeal (there is no appeals process). When in doubt, the best course of action is to stop what you're doing. Walk away from your device, and take some time to examine your life choices.
                        </p>

                        <p>
                            We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. All provisions of this Agreement that, by their nature, should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Advertising
                        </StyledH2>
                        <p>
                            We may or may not have ads on this app when it's ready to ship. If it does, we bear no responsibility for the nutty things advertisers might say in their attempt to separate you from your hard-earned cash. If you find an ad abusive or misleading, the ad network has a mechanism for that.
                        </p>
                        <p>
                            We take the project's reputation and credibility seriously and don't wish to stain it with the dubious claims of marketeers, but to cover costs we've got to do something and a bake sale over the Internet seems inadvisable at this time.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Intellectual Property
                        </StyledH2>
                        <p>
                            The Site and its original content, features, and functionality are owned by Mark Arenz and Ridiculopathy.com and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>

                        <StyledHr />

                        <StyledH2>
                            Changes to the Terms of Service
                        </StyledH2>
                        <p>
                            The entity responsible for this project reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms. If there are any changes to our privacy policy, we will announce that these changes have been made on our home page and on other key pages on our site. If there are any changes in how we use our site customers' Personally Identifiable Information, notification by email or postal mail will be made to those affected by the change. Any changes to our privacy policy will be posted on our site 30 days prior to these changes taking place. You are therefore advised to re-read this statement on a regular basis.
                        </p>


                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </Container>
        </StyledPage>
    </StyledMain>);
};

export default TermsOfService;
