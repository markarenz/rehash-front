import gql from "graphql-tag";

const GET_UNREAD_MESSAGES = gql`
    query{
        getUnreadMessages{
            numUnreadMessages
        }
    }
`;
export default GET_UNREAD_MESSAGES;
