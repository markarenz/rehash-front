import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {Container, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { SentimentVeryDissatisfied as IconSad } from '@material-ui/icons';
import { pageStyle } from "../config";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {
    GET_MESSAGES,
    DELETE_MESSAGE
} from "../queries";
import {
    LoadingDialog,
    MessageDisplay,
} from "../components";

const StyledPage = styled.div`${pageStyle}`;
const StyledH2 = styled.h2`
    margin-bottom:20px;
    font-size:24px;
    line-height:1.3;
    font-weight:bold;
`;

const sadAnim = keyframes`
        0% {
            transform: rotate(-20deg);
        }
        50% {
            transform: rotate(20deg);
        }
        100% {
            transform: rotate(-20deg);
        }
`;
const StyledIconSad = styled(IconSad)`
    width: 100%!important;
    font-size: 170px!important;
    animation-duration: 3.0s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-name: ${sadAnim};    
`;

const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg-pink.gif);
    background-size: 1024px;
    background-repeat:repeat;
    image-rendering: pixelated;
    color:white;
`;
const Messages = ({ getUnreadMessages }) => {
    const itemsPerPage = 20;
    const [messages, setMessages] = useState([]);
    // const [page, setPage] = useState(0);
    const page = 0;
    const offset = page * itemsPerPage;
    const { data, loading: getMessagesIsLoading } = useQuery(GET_MESSAGES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            offset,
            itemsPerPage,
        },
    });
    const [deleteMessageGql] = useMutation(DELETE_MESSAGE);
    const handleDeleteMessage = async (id) => {
        setMessages(messages.filter((item) => item._id !== id))
        await deleteMessageGql({
            variables: {
                messageId: id,
            },
        });
        getUnreadMessages();
    };
    useEffect(() => {
        if (data) {
            setMessages(data.getMessages)
        }
    }, [data]);

    // const handlePaginationNav = (dir) => {
    //     setPage(page + dir)
    // };
    return (
        <StyledMain>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Messages</h1>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                !getMessagesIsLoading && messages.length > 0 && <Grid container spacing={3}>
                                    {
                                        messages.map((message, idx) => <MessageDisplay
                                            key={idx}
                                            message={message}
                                            handleDeleteMessage={handleDeleteMessage}
                                        />)
                                    }
                                </Grid>
                            }
                            {
                                !getMessagesIsLoading && messages.length < 1 && <Grid container spacing={3}>
                                    <Grid item xs={12} sm={2}>
                                        <StyledIconSad />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Grid item xs={12}>
                                            <StyledH2>
                                                Oh, no! No messages yet.
                                            </StyledH2>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <p>
                                                Please don't let this lead you to question your social media mojo or, more generally, your overall significance in the world.
                                                That's a dark spiral, friend, and we'd like to help you steer clear of it if we can.
                                                Truth be told, there aren't a lot of users yet.
                                                So, relax in the knowledge that someone loves you. We do.
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }

                        </Grid>
                    </Grid>
                </Container>
            </StyledPage>
            <LoadingDialog
                isLoading={getMessagesIsLoading}
            />
        </StyledMain>
    )
};

Messages.propTypes = {
    getUnreadMessages: PropTypes.func.isRequired,
};

export default Messages;
