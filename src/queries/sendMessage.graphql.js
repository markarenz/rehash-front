import gql from "graphql-tag";

const SEND_MESSAGE = gql`
    mutation($toUser: String!, $fromUser: String!, $content: String!){
        sendMessage(
            toUser: $toUser
            fromUser: $fromUser
            content: $content
        ){
            success
        }
    }
`;
export default SEND_MESSAGE;
