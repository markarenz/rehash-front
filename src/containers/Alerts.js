import React, { useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import { breakPoints } from '../config';
import { colors } from '../config/index';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    IconButton,
} from '@material-ui/core';
import {
    PButton,
} from '../components';
import { pageStyle } from "../config";
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    GET_ALERTS,
    DELETE_ALERT,
} from "../queries";
import moment from 'moment';
import { dateDisplayFormat } from '../common/constants';
import {
    Delete as IconDelete,
    FavoriteTwoTone as IconTypeFav,
    Announcement as IconTypeDefault,
    ArrowBack as IconPrev,
    ArrowForward as IconNext,
    LocalBar as IconRelax,
} from "@material-ui/icons";
import PropTypes from 'prop-types';

const StyledPage = styled.div`${pageStyle}`;
const StyledGrid = styled(Grid)`
    @media (max-width: ${breakPoints.header}px) {
        display:block;
        text-align:center;
    }
`;
const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg-orange.gif);
    background-size: 1024px;
    background-repeat:repeat;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    color:white;
`;
const StyledIconTypeStyle = `
    width:100%!important;
    height:auto!important;
    @media (max-width: ${breakPoints.header}px) {
        max-width:80px;
    }
`;
const StyledIconTypeFav = styled(IconTypeFav)`${StyledIconTypeStyle}`;
const StyledIconTypeDefault = styled(IconTypeDefault)`${StyledIconTypeStyle}`;

const StyledCard = styled(Card)`
    margin-bottom:30px;
`;
const swingAnim = keyframes`
        0% {
            transform: rotate(0deg);
        }
        5% {
            transform: rotate(-10deg);
        }
        10% {
            transform: rotate(10deg);
        }
        15% {
            transform: rotate(-10deg);
        }
        20% {
            transform: rotate(10deg);
        }
        25% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
`;
// const StyledIconNew = styled(IconNew)`
//     width:30px!important;
//     height:auto!important;
//     color: ${colors.red}
// `;
const StyledH2 = styled.h2`
    margin-bottom:20px;
    font-size:24px;
    line-height:1.3;
    font-weight:bold;
`;
const StyledCardContent = styled(CardContent)`
    background-color: ${props => props.isread === 'n' ? colors.yellow : 'inherit'};
`;
const StyledIconRelax = styled(IconRelax)`
    width: 100%!important;
    font-size: 170px!important;
    animation-duration: 3.0s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-name: ${swingAnim};
`;
const AlertFooter = styled(CardActions)`
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
    }    
`;

const FooterGridR = styled(Grid)`
    display:flex;
    align-items:center;
    justify-content: flex-end;
    @media (max-width: ${breakPoints.header}px) {
        display:block;
        text-align:center;
    }    
`;

const Alerts = ({ getUnreadAlerts }) => {
    const itemsPerPage = 3;
    const [deleteAlertGql] = useMutation(DELETE_ALERT);
    const [page, setPage] = useState(0);
    const [alerts, setAlerts] = useState([]);
    const offset = page * itemsPerPage;
    const handleAlertDelete = async (id) => {
        // setPage(0);
        setAlerts(alerts.filter((item) => item._id !== id))
        await deleteAlertGql({
            variables: {
                alertId: id,
            },
        });
        getUnreadAlerts();
    }
    const { data, isLoadingAlerts } = useQuery(GET_ALERTS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            offset,
            itemsPerPage,
        },
    });

    useEffect(() => {
        if (data) {
            setAlerts(data.getAlerts)
        }
    }, [data]);

    const displayAlertTypeIcon = (alertType) => {
        switch(alertType) {
            case 'fav':
                return <StyledIconTypeFav />
            default:
                return <StyledIconTypeDefault />
        }
    }
    const handlePaginationNav = (dir) => {
        setPage(page + dir)
    };

    const PaginationDisplay = () => {
        if (!alerts) {
            return null;
        }
        return (
            <Grid item xs={12} align="right">
                <span style={{ marginRight: 20 }}>
                    { offset } - { (offset + alerts.length) }
                </span>
                {
                    page > 0 && <span style={{ marginRight: 20 }}>
                        <PButton
                            label="Previous"
                            handler={() => handlePaginationNav(-1)}
                            icon={<IconPrev />}
                            disabled={false}
                        /></span>
                }
                {
                    (alerts && (alerts.length === 0 || alerts.length) === itemsPerPage) && <PButton
                        label="Next"
                        handler={() => handlePaginationNav(1)}
                        icon={<IconNext />}
                        disabled={false}
                    />
                }
            </Grid>
        );
    };

    return (
        <StyledMain>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Alerts</h1>
                        </Grid>
                    </Grid>
                    {
                        !isLoadingAlerts && alerts.length === 0 && <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <StyledIconRelax />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Grid item xs={12}>
                                    <StyledH2>
                                        No alerts? No problem!
                                    </StyledH2>
                                </Grid>
                                <Grid item xs={12}>
                                    <p>
                                        Normally, this is where you'll see loads of alerts demanding your attention.
                                        So far, though, you have no alerts. Great news! You can just relax.
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    {
                        !isLoadingAlerts && alerts.length > 0 && <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <PaginationDisplay />
                            </Grid>
                        </Grid>
                    }

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {
                                alerts && alerts.map((item, idx) => <StyledCard key={idx}>
                                    <StyledCardContent isread={item.isRead ? 'y' : 'n'}>
                                        <Grid container spacing={3}>
                                            <StyledGrid item xs={12} sm={1}>
                                                { displayAlertTypeIcon(item.alertType) }
                                            </StyledGrid>
                                            <Grid item xs={12} sm={11}>
                                                {item.alertMessage}
                                            </Grid>
                                        </Grid>
                                    </StyledCardContent>
                                    <AlertFooter>
                                        <Grid container spacing={3}>
                                            <FooterGridL item xs={12} sm={8} align="left">
                                                <i>
                                                    { moment(item.createdAt, `x`).format(dateDisplayFormat) }
                                                </i>
                                            </FooterGridL>
                                            <FooterGridR item xs={12} sm={4} align="right">
                                                <IconButton
                                                    onClick={() => handleAlertDelete(item._id)}
                                                >
                                                    <IconDelete />
                                                </IconButton>
                                            </FooterGridR>
                                        </Grid>
                                    </AlertFooter>
                                </StyledCard>)
                            }
                        </Grid>
                    </Grid>
                </Container>
            </StyledPage>
        </StyledMain>
    )
};

Alerts.propTypes = {
    getUnreadAlerts: PropTypes.func.isRequired,
}

export default Alerts;
