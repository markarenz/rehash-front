import gql from "graphql-tag";

const GET_MESSAGES = gql`
    query($offset: Int!, $itemsPerPage: Int!){
        getMessages(
            offset: $offset
            itemsPerPage: $itemsPerPage
        ){
            fromUser {
                _id
                name
                avatar
            }
            _id
            content
            isRead
            createdAt
        }
    }
`;
export default GET_MESSAGES;
