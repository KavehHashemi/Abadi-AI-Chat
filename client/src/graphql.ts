import { gql } from "@apollo/client";

///QUERIES
export const MESSAGES_QUERY = gql`
  query Query {
    messages {
      id
      text
      date
      owner
    }
  }
`;

///MESSAGE-MUTATION
export const ADD_MESSAGE = gql`
  mutation Mutation($owner: String, $text: String) {
    addMessage(owner: $owner, text: $text) {
      id
      text
      owner
    }
  }
`;
