import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Avatar,
} from '@material-ui/core';
import {
    Delete as IconDelete,
    Reply as IconReply,
} from '@material-ui/icons';
import {
    PButton
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakPoints } from "../config";
import { dateDisplayFormat } from '../common/constants';
import moment from 'moment';
import history from "../utils/history";

const MessageFooter = styled(CardActions)`
  border-top: 1px dashed #555;
  background: #ddd;
  div{
    padding:10px;
  }  
`;
const FooterGridL = styled(Grid)`
    display:flex;
    align-items:center;
    a{
        text-decoration:none;
        font-weight:bold;
    }
    @media (max-width: ${breakPoints.header}px) {
        display:block;
        text-align:center;
        line-height: 2.0;
        .MuiAvatar-root{
            margin:0 auto!important;
        }
    }    
`;

const FooterGridR = styled(Grid)`
    display:flex;
    align-items:center;
    justify-content: flex-end;
`;
const FooterAvatar = styled(Avatar)`
    &.MuiAvatar-root{
        padding:0;
        width:50px;
        height:50px;
        margin-right:10px;
        background-color:${colors.greyDark};
    }
`;
const MessageContent = styled.div`
    font-size:20px;
    line-height:1.3;
    font-style: italic;
    padding:20px;
`;
const StyledCardContent = styled(CardContent)`
    background-color: ${props => props.isread === 'n' ? colors.purpleLight : 'inherit'};
`;
const MessageDisplay = ({ message, handleDeleteMessage }) => {
    const user = message.fromUser;
    const date = moment(message.createdAt, `x`).format(dateDisplayFormat);
    const handleReply = () => {
        if (user?._id) {
            history.push(`/new-message/${user._id}`);
        }
    }
    return (
        <Grid item xs={12}>
            <Card>
                <StyledCardContent isread={message.isRead ? 'y' : 'n'}>
                    <MessageContent>
                        {message.content}
                    </MessageContent>
                </StyledCardContent>
                <MessageFooter>
                    <Grid container spacing={3}>
                        <FooterGridL item xs={12} sm={8} align="left">
                            <Link to={`/user/${user._id}`}>
                                <FooterAvatar
                                    alt={user.username}
                                    src={user.avatar}
                                    variant="circle"
                                />
                            </Link>
                            <span>
                            Sent from
                        </span>
                            &nbsp;
                            <Link to={`/user/${user._id}`}>
                                {user.name}
                            </Link>
                            &nbsp;
                            {`on ${date}`}
                        </FooterGridL>
                        <FooterGridR item xs={12} sm={4} align="right">
                            <span style={{ marginRight: 10 }}>
                                <PButton
                                    label='Delete'
                                    handler={() => handleDeleteMessage(message._id)}
                                    icon={<IconDelete />}
                                    disabled={false}
                                    overWhite={true}
                                />
                            </span>
                            <PButton
                                label='Reply'
                                handler={handleReply}
                                icon={<IconReply />}
                                disabled={false}
                                overWhite={true}
                            />
                        </FooterGridR>
                    </Grid>
                </MessageFooter>
            </Card>
        </Grid>
    );
};

MessageDisplay.propTypes = {
    message: PropTypes.objectOf(PropTypes.any),
    handleDeleteMessage: PropTypes.func.isRequired,
};

export default MessageDisplay;
