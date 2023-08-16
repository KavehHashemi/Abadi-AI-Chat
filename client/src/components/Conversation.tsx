import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "../store/hooks";
import NewMessage from "./NewMessage";
import { ADD_MESSAGE, MESSAGES_QUERY, QUESTION_QUERY } from "../graphql";
import { MessageType } from "../types";
import SingleMessage from "./SingleMessage";
import "../style/style.scss";
import { useEffect } from "react";

const Conversation = () => {
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { data, loading, error } = useQuery(MESSAGES_QUERY, {
    variables: { conversationID: currentConversation },
  });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    if (data && data.messages.length === 1)
      getAnswerForFirstMessage(data.messages[0]);
  }, [data]);

  const [questionQuery] = useLazyQuery(QUESTION_QUERY);
  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: MESSAGES_QUERY,
        variables: { conversationID: currentConversation },
      },
    ],
  });
  const addAIAnswer = async (answer: string) => {
    await addMessageMutation({
      variables: {
        conversationID: currentConversation,
        text: answer,
        isAI: true,
      },
    });
  };

  const getAnswerForFirstMessage = async (message: MessageType) => {
    await questionQuery({
      variables: {
        question: message.text,
        conversationID: currentConversation,
      },
      onCompleted: async (data) => {
        await addAIAnswer(data.question.text);
      },
    });
  };

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loading...</div>;
  else
    return (
      <>
        <div className="messages-container">
          {data?.messages?.map((msg: MessageType) => {
            return (
              <SingleMessage
                key={msg.id}
                date={msg.date}
                isAI={msg.isAI}
                text={msg.text}
              ></SingleMessage>
            );
          })}
        </div>
        <NewMessage conversationID={currentConversation}></NewMessage>
      </>
    );
};

export default Conversation;
