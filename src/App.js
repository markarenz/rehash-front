import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "@material-ui/core";
import Analytics from 'react-router-ga';
import theme from "./mui-theme";
import styled from 'styled-components';
import {toast, ToastContainer} from "react-toastify";
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';
import {
    Feed,
    Profile,
    Alerts,
    Messages,
    NewPost,
    FourOhFour,
    LoadingFullScreen,
    NewMessage,
    Contact,
    TermsOfService,
    PrivacyPolicy,
} from './containers';
import {
    Header,
    Footer,
    PrivateRoute,
    ScrollToTop
} from './components';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
// import { Query } from 'react-apollo';
import {
    GET_OR_CREATE_USER,
    GET_UNREAD_ALERTS,
    GET_UNREAD_MESSAGES,
} from "./queries";

const StyledApp = styled.div`
`;

const App = () => {
    const { loading, user: authUser, getIdTokenClaims, logout } = useAuth0();
    const [appUser, setAppUser] = useState({});
    const [getOrCreateUserGql] = useMutation(GET_OR_CREATE_USER);
    const [currentPage, setCurrentPage] = useState(history.location.pathname);
    const isLoggedIn = !!authUser;

    const [getUnreadMessages, {
        data: unreadMessages,
    }] = useLazyQuery(GET_UNREAD_MESSAGES, {
        fetchPolicy: 'cache-and-network',
        onError: (err) => {
            console.log('getUnreadMessages - err', err);
        },
        onCompleted: () => {
            console.log('onCompleted... getUnreadMessages');
        },
    });

    const [getUnreadAlerts, {
        data: unreadAlerts,
    }] = useLazyQuery(GET_UNREAD_ALERTS, {
        fetchPolicy: 'cache-and-network',
        onError: (err) => {
            console.log('getUnreadAlerts - err', err);
        },
        onCompleted: () => {
            console.log('onCompleted... getUnreadAlerts');
        },
    });

    const getAppUser = async () => {
        if (authUser) {
            const claims = await getIdTokenClaims();
            const idToken = claims.__raw;
            await localStorage.setItem('idToken', `Bearer ${idToken}`);
            const retrievedAppUser = await getOrCreateUserGql({
                variables: {
                    auth0Id: authUser.sub,
                    name: authUser.nickname,
                    avatar: authUser.picture,
                    email: authUser.email,
                }
            });
            if (retrievedAppUser){
                setAppUser(retrievedAppUser.data.getOrCreateUser);
            } else {
                // error
                console.log('ERROR app:49');
            }
        }
    };
    const refreshAppUser = () => {
        getAppUser();
    };
    useEffect(() => {
        return history.listen((location) => {
            // console.log(`You changed the page to: ${location.pathname}`);
            setCurrentPage(location.pathname);
        })
    });

    useEffect( () => {
        getAppUser();
        // eslint-disable-next-line
    }, [authUser]);
    const handleLogout = () => {
        localStorage.setItem('idToken', '');
        logout({
            returnTo: window.location.origin
        });
    };
    if (loading) {
        return <LoadingFullScreen />
    }
    const NewMessageWithProps = () => <NewMessage
        isLoggedIn={isLoggedIn}
        appUser={appUser}
    />
    const HomeWithProps = () => <Feed
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        appUser={appUser}
        mode="home"
    />;
    const UserWithProps = () => <Feed
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        appUser={appUser}
        mode="user"
    />;
    const ProfileWithProps = () => <Profile
        appUser={appUser}
        refreshAppUser={refreshAppUser}
        handleLogout={handleLogout}
    />;
    const NewPostWithProps = () => <NewPost
        appUser={appUser}
        isLoggedIn={isLoggedIn}
        refreshAppUser={refreshAppUser}/>;
    const AlertsWithProps = () => <Alerts
        getUnreadAlerts={getUnreadAlerts}
    />
    const MessagesWithProps = () => <Messages
        getUnreadMessages={getUnreadMessages}
    />
    return (
        <ThemeProvider theme={theme}>
            <StyledApp>
                <Router history={history}>
                    <Analytics id="UA-118400872-4" debug>
                        <ScrollToTop />
                        <Header
                            currentPage={currentPage}
                            appUser={appUser}
                            getUnreadAlerts={getUnreadAlerts}
                            unreadAlerts={unreadAlerts}
                            getUnreadMessages={getUnreadMessages}
                            unreadMessages={unreadMessages}
                        />
                        <Switch>
                            <Route exact path="/" component={HomeWithProps} />
                            <Route exact path="/contact" component={Contact} />
                            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                            <Route exact path="/terms-of-service" component={TermsOfService} />
                            <Route exact path="/user/:userId" component={UserWithProps} />
                            <PrivateRoute exact path="/messages" component={MessagesWithProps} />
                            <PrivateRoute exact path="/profile" component={ProfileWithProps} />
                            <Route exact path="/new" component={NewPostWithProps} />
                            <PrivateRoute exact path="/alerts" component={AlertsWithProps} />
                            <PrivateRoute path="/new-message/:userId" component={NewMessageWithProps} />
                            <Route path="*" component={FourOhFour} />
                        </Switch>
                        <Footer />
                    </Analytics>
                </Router>
            </StyledApp>
            <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                className='toastContainer'
                bodyClassName='toastItem'
                progressClassName='toastItem'
            />
        </ThemeProvider>
    );
};
// export default compose(

export default App;
