import { useQuery, useLazyQuery } from "@apollo/client";
import { useAppSelector } from "../store/hooks";
import NewMessage from "./NewMessage";
import { MESSAGES_QUERY } from "../graphql";
import { MessageType } from "../types";
import SingleMessage from "./SingleMessage";
import { useEffect } from "react";

const Conversation = () => {
  const { currentConversation } = useAppSelector((state) => state.conversation);
  // const { data, loading, error } = useQuery(MESSAGES_QUERY, {
  //   variables: { conversationID: currentConversation },
  // });

  const [getMessages, { data, loading, error }] = useLazyQuery(MESSAGES_QUERY);

  useEffect(() => {
    getMessages({ variables: { conversationID: currentConversation } });
  }, []);

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loading...</div>;
  else
    return (
      <div>
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
        <NewMessage conversationID={currentConversation}></NewMessage>
      </div>
    );
};

export default Conversation;
