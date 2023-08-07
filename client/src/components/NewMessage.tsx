import { useMutation } from "@apollo/client";
import { ADD_MESSAGE, MESSAGES_QUERY } from "../graphql";
import { useRef } from "react";

type NewMessageProps = {
  conversationID: string | null;
};

const NewMessage = ({ conversationID }: NewMessageProps) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: MESSAGES_QUERY,
        variables: { conversationID: conversationID },
      },
    ],
    onCompleted: () => {
      if (messageRef.current !== null) {
        messageRef.current.value = "";
      }
    },
  });

  const addNewMessage = () => {
    addMessageMutation({
      variables: {
        conversationID: conversationID,
        text: messageRef.current?.value,
        isAI: false,
      },
    });
  };

  return (
    <div>
      <input ref={messageRef} type="text"></input>
      <button onClick={addNewMessage}>send</button>
    </div>
  );
};

export default NewMessage;
