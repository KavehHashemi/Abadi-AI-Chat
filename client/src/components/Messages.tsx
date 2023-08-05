import { useQuery } from "@apollo/client";
import { MESSAGES_QUERY } from "../graphql";
import { MessageType } from "../types";
import SingleMessage from "./SingleMessage";

const Messages = () => {
  const { data, loading, error } = useQuery(MESSAGES_QUERY);

  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  else {
    return (
      <div
        style={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {data.messages?.map((msg: MessageType) => {
          return (
            <SingleMessage
              key={msg.id}
              id={msg.id}
              date={msg.date}
              owner={msg.owner}
              text={msg.text}
            ></SingleMessage>
          );
        })}
      </div>
    );
  }
};

export default Messages;
