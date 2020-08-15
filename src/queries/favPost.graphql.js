import gql from "graphql-tag";

const FAV_POST = gql`
    mutation($isFav: Boolean!, $favUser: String!, $favPost: String!){
        favPost(
            isFav: $isFav
            favUser: $favUser
            favPost: $favPost
        ){
            _id
        }
    }
`;
export default FAV_POST;
