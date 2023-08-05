import { gql } from "@apollo/client";

///QUERIES

export const FILES_QUERY = gql`
  query Query {
    files {
      id
      filename
      length
      uploadDate
      chunkSize
    }
  }
`;

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

export const SETS_QUERY = gql`
  query Query {
    sets {
      id
      name
      lastReading
      createdAt
      cards {
        id
      }
    }
  }
`;

// export const CARDS_QUERY = gql`
//   query Query($id: ID) {
//     cards(id: $id) {
//       id
//       question
//       answer
//       lastReading
//       history
//       createdAt
//     }
//   }
// `;

export const CARDS_QUERY = gql`
  query Cards($id: ID) {
    cards(id: $id) {
      id
      question
      answer
      lastReading
      history
      createdAt
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

export const ADD_FILE_MUTATION = gql`
  mutation Mutation($file: Upload!) {
    addFile(file: $file) {
      id
    }
  }
`;

///SET-MUTATIONS
export const ADD_SET_MUTATION = gql`
  mutation Mutation($name: String) {
    addSet(name: $name) {
      id
      name
      cards {
        question
      }
      lastReading
      createdAt
    }
  }
`;

export const EDIT_SET_MUTATION = gql`
  mutation Mutation($id: ID, $name: String) {
    editSet(id: $id, name: $name) {
      id
      name
    }
  }
`;
export const DELETE_SET_MUTATION = gql`
  mutation Mutation($id: ID) {
    deleteSet(id: $id)
  }
`;

///CARD-MUTATIONS
export const ADD_CARD_MUTATION = gql`
  mutation Mutation(
    $question: String
    $answer: String
    $set: String
    $createdAt: String
    $lastReading: String
  ) {
    addCard(
      question: $question
      answer: $answer
      set: $set
      createdAt: $createdAt
      lastReading: $lastReading
    ) {
      id
      question
      answer
    }
  }
`;

export const EDIT_CARD_MUTATION = gql`
  mutation Mutation($set: ID, $question: String, $answer: String, $id: ID) {
    editCard(set: $set, question: $question, answer: $answer, id: $id) {
      question
      answer
      id
    }
  }
`;

export const DELETE_CARD_MUTATION = gql`
  mutation Mutation($set: ID, $id: ID) {
    deleteCard(set: $set, id: $id)
  }
`;
