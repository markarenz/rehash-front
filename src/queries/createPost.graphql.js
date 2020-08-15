import gql from "graphql-tag";

const CREATE_POST = gql`
    mutation($content: String!){
        createPost(
            content: $content
        ){
            _id
        }
    }
`;
export default CREATE_POST;
