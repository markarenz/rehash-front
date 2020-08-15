import gql from "graphql-tag";

const GET_UNREAD_ALERTS = gql`
    query{
        getUnreadAlerts{
            numUnreadAlerts
        }
    }
`;
export default GET_UNREAD_ALERTS;
