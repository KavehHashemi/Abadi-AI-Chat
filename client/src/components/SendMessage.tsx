import { useMutation } from "@apollo/client";
import { ADD_MESSAGE, MESSAGES_QUERY } from "../graphql";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SendMessage = () => {
  const [text, setText] = useState<string>("");

  const { user } = useAuth0();

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: MESSAGES_QUERY }],
  });

  const sendMessage = () => {
    addMessageMutation({
      variables: {
        owner: user?.nickname || "unknown user",
        text: text,
      },
    });
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={() => sendMessage()}>send</button>
    </div>
  );
};

export default SendMessage;
