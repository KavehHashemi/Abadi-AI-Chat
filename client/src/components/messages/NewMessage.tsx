import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_MESSAGE, MESSAGES_QUERY, QUESTION_QUERY } from "../../graphql";
import { useRef } from "react";
import { Button, Paper, TextField } from "@mui/material";

type NewMessageProps = {
  conversationID: string | null;
};

const NewMessage = ({ conversationID }: NewMessageProps) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [questionQuery] = useLazyQuery(QUESTION_QUERY);
  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: MESSAGES_QUERY,
        variables: { conversationID: conversationID },
      },
    ],
  });

  const addNewMessage = async () => {
    await addMessageMutation({
      variables: {
        conversationID: conversationID,
        text: messageRef.current?.value,
        isAI: false,
      },
    });
  };

  const addAIAnswer = async (answer: string) => {
    await addMessageMutation({
      variables: {
        conversationID: conversationID,
        text: answer,
        isAI: true,
      },
    });
  };

  const handleClick = async () => {
    await addNewMessage();
    await questionQuery({
      variables: {
        question: messageRef.current?.value,
        conversationID: conversationID,
      },
      onCompleted: async (data) => {
        await addAIAnswer(data.question.text);
      },
    });
    if (messageRef.current) messageRef.current.value = "";
  };

  return (
    <Paper square className="new-message-container">
      <TextField
        name="new-message"
        placeholder="ask me"
        variant="outlined"
        autoFocus
        inputRef={messageRef}
        type="text"
      ></TextField>
      <Button variant="contained" onClick={handleClick}>
        Ask
      </Button>
    </Paper>
  );
};

export default NewMessage;
