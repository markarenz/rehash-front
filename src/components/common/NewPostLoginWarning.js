import React from 'react';
import styled from 'styled-components';
import { colors } from '../../config';
import {
    Grid,
    Card,
    CardContent,
} from '@material-ui/core';
import {
    Warning as IconWarning
} from '@material-ui/icons';

const StyledCard = styled(Card)`
    margin:20px 0;
    background-color:${colors.pink}!important;
    border-color: white!important;
    color:white;
`;
const AlertH2 = styled.h2`
        color:white;
        margin:0 0 10px 0;
`;
const AlertP = styled.p`
        color:white;
`;
const AlertIcon = styled(IconWarning)`
    width:50px!important;
    height:50px!important;
    color:white;
`;

const NewPostLoginWarning = () => <StyledCard>
    <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={1} align="center">
                <AlertIcon />
            </Grid>
            <Grid item xs={12} sm={11}>
                <AlertH2>Oh, I see what you're doing.</AlertH2>
                <AlertP>
                    You're making a new post but you're not logged in. That's cool.
                    Go nuts. But you won't be able to publish your post until you create an account & log in.
                </AlertP>
            </Grid>
        </Grid>
    </CardContent>
</StyledCard>;

export default NewPostLoginWarning;
