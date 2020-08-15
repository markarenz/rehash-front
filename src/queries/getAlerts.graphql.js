import gql from "graphql-tag";

const GET_ALERTS = gql`
    query($offset: Int!, $itemsPerPage: Int!){
        getAlerts(
            offset: $offset
            itemsPerPage: $itemsPerPage
        ){
            _id
            alertType
            alertMessage
            alertLinkId
            alertLinkType
            isRead
            createdAt
        }
    }
`;
export default GET_ALERTS;
