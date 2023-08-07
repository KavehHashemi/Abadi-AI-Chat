import { useMutation } from "@apollo/client";
import { ADD_CONVERSATION, ADD_MESSAGE, CONVERSATIONS_QUERY } from "../graphql";
import { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../store/hooks";
import { setCurrentConversation } from "../store/conversation";
import { useNavigate } from "react-router-dom";

type NewConversationProps = {
  userID: string;
};

const NewConversation = ({ userID }: NewConversationProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth0();
  const messageRef = useRef<HTMLInputElement>(null);
  const [addConversationMutation] = useMutation(ADD_CONVERSATION, {
    refetchQueries: [
      {
        query: CONVERSATIONS_QUERY,
        variables: { userID: user?.sub?.split("|")[1] },
      },
    ],
    onCompleted: (data) => {
      dispatch(setCurrentConversation(data.addConversation.id));
      addTitleAsFirstMessage(data.addConversation.id);
    },
  });

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    onCompleted: () => {
      navigate("/conversation");
    },
  });

  const addTitleAsFirstMessage = (id: string) => {
    addMessageMutation({
      variables: {
        conversationID: id,
        text: messageRef.current?.value,
        isAI: false,
      },
    });
  };

  const addNewConversation = () => {
    addConversationMutation({
      variables: { userID: userID, title: messageRef.current?.value },
    });
  };

  return (
    <div>
      <input ref={messageRef} type="text"></input>
      <button onClick={addNewConversation}>send</button>
    </div>
  );
};

export default NewConversation;
