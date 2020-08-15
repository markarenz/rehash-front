import React, { useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    Card,
    Button
} from "@material-ui/core";
import { colors, pageStyle } from "../config";
import styled from 'styled-components';
import { validateEmail } from '../common/helpers';
import {
    Send as IconSubmit,
} from '@material-ui/icons';
import {
    LoadingDialog,
    PButton,
} from '../components';
import { contactOptions } from '../data';
import { toast } from 'react-toastify';
import history from "../utils/history";

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
const StyledTextField = styled(TextField)`
    width:100%;
    .MuiOutlinedInput-notchedOutline{
        border-color: white;
    }
    .MuiInputBase-root{
        color:white;
        &:hover{
            .MuiOutlinedInput-notchedOutline{
                border-color: white;
            }
        }
    }
    .MuiFormLabel-root{
        color:white;
    }
`;
const stepStageDefault = `
    transition: 0.5s ease-out all;
    display:block;
    opacity:0;
    transform: translateY(50px);
`;
const stepStageActive = `
    opacity:100;
    transform: translateY(0);
`;
const Step2Stage = styled.div`
    margin-top:30px;
    ${stepStageDefault}
    ${props => props.stepactive === 'y' && stepStageActive};
`;
const StepNumber = styled.div`
    width:100%;
    text-align:center;
    font-weight:bold;
    font-size:100px;
    color: white;
`;
const VCenterGrid = styled(Grid)`
    display: flex;
    align-items: center;
    color: white;
`;
const CardPad = styled.div`
    padding: 30px;
`;
const TopicButton = styled(Button)`
    width:100%;
    height:100%;
    transition: 0.5s ease-out all;
    &.MuiButton-outlined{
        border-color: white;
        color:white;
    }
    &.MuiButton-contained{
        background-color: white;
        color:${colors.blueDark};
    }
`;

const Contact = () => {
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const emailValid = validateEmail(email);
    const handleTopicChange = (val) => {
        setTopic(val);
    }
    const handleQuestionSelect = (val) => {
        setQuestion(val);
    };
    const topicOptions = Object.keys(contactOptions);
    const currentTopicObj = contactOptions[topic];
    const currentTopicDesc = currentTopicObj?.desc;
    const currentTopicOptions = currentTopicObj?.options;
    const QuestionsColumn = ({ side } ) => {
        if (!contactOptions[topic]) return null;
        const numItems = contactOptions[topic].length;
        const breakpoint = currentTopicObj.breakpoint;
        const start = (side === 0) ? 0 : breakpoint;
        const end = (side === 0) ? breakpoint : numItems;
        return currentTopicOptions && currentTopicOptions.slice(start, end).map((item) => <Grid key={item} item xs={12}>
            <TopicButton
                variant={item === question ? 'contained' : 'outlined'}
                active={item === question ? 'y' : 'n'}
                onClick={() => handleQuestionSelect(item)}
            >
                {item}
            </TopicButton>
        </Grid>);
    };
    const handleSubmitContact = () => {
        setIsSending(true);
        var formData = new FormData();
        formData.append('email', email);
        formData.append('topic', topic);
        formData.append('question', question);
        fetch(`${process.env.REACT_APP_API_URL}/contact`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setIsSending(false);
                toast('Message sent successfully.');
                history.push('/');
            })
            .catch((err) => {
                setIsSending(false);
                console.log('err', err);
            });
    };
    return (<StyledMain>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Contact Us</h1>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={8}>
                            <Card style={{ backgroundColor: colors.pink }}>
                                <CardPad>
                                    <Grid container spacing={3}>
                                        <VCenterGrid item xs={2}>
                                            <StepNumber>
                                                1
                                            </StepNumber>
                                        </VCenterGrid>
                                        <VCenterGrid item xs={5}>
                                            First off, enter your email so we can get back to you when and if it's appropriate.
                                        </VCenterGrid>
                                        <VCenterGrid item xs={5}>
                                            <StyledTextField
                                                variant="outlined"
                                                value={email}
                                                label="email"
                                                type="email"
                                                onChange={handleEmailChange}
                                            />
                                        </VCenterGrid>
                                    </Grid>
                                </CardPad>
                            </Card>

                            <Step2Stage stepactive={emailValid ? 'y' : 'n'}>
                                <Card style={{ backgroundColor: colors.blueGrey }}>
                                    <CardPad>
                                        <Grid container spacing={3}>
                                            <VCenterGrid item xs={2}>
                                                <StepNumber>
                                                    2
                                                </StepNumber>
                                            </VCenterGrid>
                                            <VCenterGrid item xs={5}>
                                                Next, pick a topic for your query. Choose wisely.
                                            </VCenterGrid>
                                            <VCenterGrid item xs={5}>
                                                <Grid container spacing={3}>
                                                    {
                                                        topicOptions.map((item) => <Grid key={item} item xs={12}>
                                                            <TopicButton
                                                                variant={item === topic ? 'contained' : 'outlined'}
                                                                active={item === topic ? 'y' : 'n'}
                                                                onClick={() => handleTopicChange(item)}
                                                            >
                                                                {item}
                                                            </TopicButton>
                                                        </Grid>)
                                                    }
                                                </Grid>
                                            </VCenterGrid>
                                        </Grid>
                                    </CardPad>
                                </Card>
                            </Step2Stage>

                            <Step2Stage stepactive={topic !== '' ? 'y' : 'n'}>
                                <Card style={{ backgroundColor: colors.green }}>
                                    <CardPad>
                                        <Grid container spacing={3}>
                                            <VCenterGrid item xs={2}>
                                                <StepNumber>
                                                    3
                                                </StepNumber>
                                            </VCenterGrid>
                                            <VCenterGrid item xs={5}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        {currentTopicDesc}
                                                    </Grid>
                                                    <QuestionsColumn
                                                        side={0}
                                                    />
                                                </Grid>
                                            </VCenterGrid>
                                            <VCenterGrid item xs={5}>
                                                <Grid container spacing={3}>
                                                    <QuestionsColumn
                                                        side={1}
                                                    />
                                                </Grid>
                                            </VCenterGrid>
                                        </Grid>
                                    </CardPad>
                                </Card>
                            </Step2Stage>

                            <Step2Stage stepactive={emailValid & topic !== '' && question !== '' ? 'y' : 'n'}>
                                <Grid container spacing={3} style={{ marginTop: 20 }}>
                                    <Grid item xs={12} align="right">
                                        <PButton
                                            label="Send"
                                            handler={handleSubmitContact}
                                            icon={<IconSubmit />}
                                            disabled={false}
                                        />
                                    </Grid>
                                </Grid>
                            </Step2Stage>

                        </Grid>
                        <Grid item xs={2} />
                    </Grid>
                </Container>
            </StyledPage>
            <LoadingDialog
                isLoading={isSending}
            />
        </StyledMain>);
};

export default Contact;
