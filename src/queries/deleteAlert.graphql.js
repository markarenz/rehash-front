import gql from "graphql-tag";

const DELETE_ALERT = gql`
    mutation($alertId: String!){
        deleteAlert(
            alertId: $alertId
        ){
            success
        }
    }
`;
export default DELETE_ALERT;
