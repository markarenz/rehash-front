import { isProduction } from '../common/helpers';

const appConfig = {
    REACT_APP_AUTH0_DOMAIN: 'rehashapp.auth0.com',
    REACT_APP_AUTH0_CLIENTID: 'n8JehCx6E8S25hwuNDUlunhn2bMLwm2d',
    REACT_APP_GOOGLE_ADSENSE_PUBLISHER: 'pub-0660784381554248',
    REACT_APP_API_URL: isProduction() ? 'https://rehash-ridiculopathy.herokuapp.com' : 'http://localhost:5000',
    // REACT_APP_API_URL: 'https://rehash-ridiculopathy.herokuapp.com',
};

const breakPoints = {
    header: 1000,
    smMin: 600,
    xsMax: 599,
};

const colors = {
    blueLight: "#84d3eb",
    black: "#333333",
    purple: "#9751a0",
    green: "#41b649",
    pink: "#e34e9c",
    orange: "#e8a526",
    blueGrey: "#2183a0",
    yellow: "#F1DE6D",

    purpleDark: "#6e3b77",
    pinkDark: "#924158",
    greenDark: "#377b3d",
    orangeDark: "#a47617",
    blueDark: "#0f4c5e",

    red: "#dd0000",
    greyDark: "#777777",
    greyDarker: "#555555",
    greyLight: "#bbbbbb",
    purpleLight: "#dfb2c9",
};
const colorsByRole = {
    header: colors.blueLight,
    feed: colors.purple,
    search: colors.green,
    new: colors.green,
    messages: colors.pink,
    alerts: colors.orange,
    twitter: colors.blueGrey,
    profile: colors.greyDark,
    feedDark: colors.purpleDark,
    searchDark: colors.greenDark,
    newDark: colors.pinkDark,
    alertsDark: colors.orangeDark,
    profileDark: colors.greyDark,
};
const noSelect = `
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
`;

const pageStyle = `
    position:relative;
    padding: 120px 0 50px 0;
    overflow-x: hidden;
    @media (max-width: 1000px) {
        padding-top:180px;
    }
    h1{
        margin:0;
    }
`;


export {
    colors,
    colorsByRole,
    breakPoints,
    pageStyle,
    noSelect,
    appConfig,
}
