import gql from "graphql-tag";

const DELETE_MESSAGE = gql`
    mutation($messageId: String!){
        deleteMessage(
            messageId: $messageId
        ){
            success
        }
    }
`;
export default DELETE_MESSAGE;
