import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Auth0Provider, useAuth0} from "./react-auth0-spa";
import history from "./utils/history";
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http'; // HttpLink
import { ApolloProvider } from '@apollo/react-hooks';
import { onError } from 'apollo-link-error';
import { appConfig } from './config';

const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: `${appConfig.REACT_APP_API_URL}/api` });
const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            // NOTE: TOKEN INCLUDES "Bearer "
            authorization: localStorage.getItem("idToken") || null
        }
    });
    return forward(operation);
});
const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (networkError) {
        const { isAuthenticated, logout } = useAuth0();
        if (networkError.statusCode === 401) {
            localStorage.setItem('idToken', '');
            if (isAuthenticated){
                logout();
            }
        }
    }
    if (graphQLErrors) {
        graphQLErrors.map(({message}) => console.log(message));
    }
});
const link = middlewareLink.concat(errorLink).concat(httpLink);

const client = new ApolloClient({
    cache,
    link
});

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        client_id={process.env.REACT_APP_AUTH0_CLIENTID}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <ApolloProvider
            client={client}
        >
            <App />
        </ApolloProvider>
    </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
