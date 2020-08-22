import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import { colors } from '../config';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Tabs,
    Tab,
    Button,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { messageSources } from '../data';
import { useMutation } from "@apollo/react-hooks";
import { shuffleArray, toSentenceCase } from '../common/helpers';
import {
    Headline2,
    PButton,
    LoadingDialog,
} from "../components";
import {
    Send as IconSend,
    Shuffle as IconRandomize,
    Replay as IconClear,
    Backspace as IconBackspace,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { pageStyle } from "../config";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_USER_BY_ID, SEND_MESSAGE } from "../queries";
import history from "../utils/history";

const blinkAnim = keyframes`
        0% {
            opacity:1.0;
        }
        49% {
            opacity:1.0;
        }
        50% {
            opacity:0.0;
        }
        99% {
            opacity:1.0;
        }
        100% {
            opacity:1.0;
        }
    `;
const Cursor = styled.span`
    animation: ${blinkAnim} 0.7s infinite;
    margin-left:6px;
`;
const MessageDisplay = styled.div`
    padding:20px;
    font-size:20px;
    line-height:1.3;
`;
const StyledPage = styled.div`${pageStyle}`;
const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg-${props => props.mode === 'home' ? 'purple' : 'blue'}.gif);
    background-size: 1024px;
    background-repeat:repeat;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    color:white;
`;
const SourceButton = styled(Button)`
    margin: 5px!important;
    .MuiButton-label{
        font-size: ${props => props.ispunctuation === 'y' ? '30px' : '18px'};
    }
`;
const StyledTabs = styled(Tabs)`
    background-color: #eee!important;
    .MuiTabs-indicator{
        background-color: ${colors.red}!important;
    }
`;
const StyledTab = styled(Tab)`
    background-color: ${props => props.active === 'y' ? '#ddd!important' : '#eee!important'};
`;
const NewMessage = ({ isLoggedIn, appUser }) => {
    const sourceTypes = Object.keys(messageSources);
    const [sendMessageGql, { loading: sendMessageIsLoading }] = useMutation(SEND_MESSAGE);
    const punctuationSourceType = 8;
    const [message, setMessage] = useState('');
    const [selectedSourceType, setSelectedSourceType] = useState(0);
    const numSourceItems = 20;
    const getRandomizedSlicedMessagesSourcesByType = (sourceType) => (sourceType === 'punctuation') ? messageSources[sourceType] : shuffleArray(messageSources[sourceType]).slice(0,numSourceItems);
    const [filteredMessageSources, setFilteredMessageSources] = useState(
        sourceTypes.map((sourceType, idx) => getRandomizedSlicedMessagesSourcesByType(sourceTypes[idx]))
    );
    const randomizeSources = () => {
        setFilteredMessageSources(
            sourceTypes.map((sourceType, idx) => getRandomizedSlicedMessagesSourcesByType(sourceTypes[idx]))
        );
    };
    let { userId } = useParams();
    const [getUserById, {
        loading: getUserByIdIsLoading,
        data: userInfo,
    }] = useLazyQuery(GET_USER_BY_ID, {
        variables: {
            id: userId,
        },
    });
    const fetchUserInfo = async () => {
        await getUserById({
            variables: {
                id: userId,
            }
        });
    }
    useEffect( () => {
        fetchUserInfo();
        // eslint-disable-next-line
    }, [userId]);
    const userInfoData = userInfo && userInfo.getUserById;
    const toUserName = userInfoData && userInfoData.name
    const handleSendMessage = async () => {
        try {
            await sendMessageGql({
                variables: {
                    toUser: userId,
                    fromUser: appUser._id,
                    content: message,
                },
            });
            toast('Message sent successfully.');
            history.push('/');
        } catch(error){
            console.log('Error triggered by handleSendMessage', error);
        }
    };

    const handleSelectedSourceTypeChange = (e, newValue) => {
        setSelectedSourceType(newValue);
    };
    const handleSourceWordClick = (word) => {
        const wordSep = (selectedSourceType === punctuationSourceType) ? '' : ' ';
        setMessage(toSentenceCase(`${message}${wordSep}${word}`));
    };
    const handleClearMessage = () => {
        setMessage('');
    }
    const TabPanel = (props) => {
        const { children, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={selectedSourceType !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                {selectedSourceType === index && (
                    <div>
                        {children}
                    </div>
                )}
            </div>
        );
    }
    const handleBackspace = () => {
        const words = message.split(' ');
        words.pop();
        const newMessage = words.join(' ');
        setMessage(newMessage);
    };
    const messageValid = message !== '';
    return (
        <StyledMain>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>New Message to {getUserByIdIsLoading ? '...' : toUserName}</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <Headline2 title="Source" />
                            <Card>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <StyledTabs
                                                value={selectedSourceType}
                                                onChange={handleSelectedSourceTypeChange}
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                aria-label="select-source-type"
                                            >
                                            {
                                                sourceTypes.map((item, idx) => <StyledTab
                                                    label={item}
                                                    id={`scrollable-auto-tab-${idx}`}
                                                    aria-controls={`scrollable-auto-tabpanel-${idx}`}
                                                    key={`tab-${idx}`}
                                                    active={selectedSourceType === idx ? 'y' : 'n'}
                                                />)
                                            }
                                            </StyledTabs>
                                        </Grid>
                                        <Grid item xs={12} align="center">
                                            {
                                                sourceTypes.map((item, idx) =><TabPanel
                                                    key={idx}
                                                    index={idx}
                                                >
                                                    {
                                                        filteredMessageSources[idx].map((item, idx) => <SourceButton
                                                            key={idx}
                                                            onClick={() => handleSourceWordClick(item)}
                                                            variant="outlined"
                                                            ispunctuation={selectedSourceType === punctuationSourceType ? 'y' : 'n'}
                                                        >
                                                            {item}
                                                        </SourceButton>)
                                                    }
                                                </TabPanel>)
                                            }
                                        </Grid>
                                        <Grid item xs={12} align="right">
                                            <PButton
                                                label='Shuffle'
                                                handler={randomizeSources}
                                                icon={<IconRandomize />}
                                                disabled={false}
                                                overWhite={true}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Headline2 title="Edit" />
                            <Card>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <MessageDisplay>
                                                {message}
                                                <Cursor>|</Cursor>
                                            </MessageDisplay>
                                        </Grid>
                                        <Grid item xs={12} align="right">
                                            <span
                                                style={{ marginRight: 10 }}
                                            >
                                                <PButton
                                                    label='Clear'
                                                    handler={handleClearMessage}
                                                    icon={<IconClear />}
                                                    disabled={message === ''}
                                                    overWhite={true}
                                                />
                                            </span>
                                            <span
                                                style={{ marginRight: 10 }}
                                            >
                                                <PButton
                                                    label='Backspace'
                                                    handler={handleBackspace}
                                                    icon={<IconBackspace />}
                                                    disabled={message === ''}
                                                    overWhite={true}
                                                />
                                            </span>
                                            <span>
                                                <PButton
                                                    label="Send"
                                                    icon={<IconSend />}
                                                    handler={handleSendMessage}
                                                    disabled={!messageValid}
                                                    overWhite={true}
                                                />
                                            </span>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </StyledPage>
            <LoadingDialog
                isLoading={sendMessageIsLoading}
            />
        </StyledMain>
    )
};

NewMessage.propTypes = {
    appUser: PropTypes.objectOf(PropTypes.any),
    isLoggedIn: PropTypes.bool.isRequired,
};
export default NewMessage;
