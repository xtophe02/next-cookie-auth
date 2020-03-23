import gql from "graphql-tag";


export const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
    
  }
`;

