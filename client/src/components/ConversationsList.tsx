import { useQuery } from "@apollo/client";
import { CONVERSATIONS_QUERY } from "../graphql";
import { useAuth0 } from "@auth0/auth0-react";
import ConversationCard from "./ConversationCard";
import NewConversation from "./NewConversation";
import { ConversationType } from "../types";

const ConversationsList = () => {
  const { user } = useAuth0();
  const { data, loading, error } = useQuery(CONVERSATIONS_QUERY, {
    variables: { userID: user?.sub?.split("|")[1] },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <div>{error.message}</div>;
  else {
    return (
      <>
        <NewConversation
          userID={user?.sub?.split("|")[1] || ""}
        ></NewConversation>
        {data.conversations?.map((cnv: ConversationType) => {
          return (
            <ConversationCard
              key={cnv.id}
              id={cnv.id}
              title={cnv.title}
              lastDate={cnv.lastDate}
              startDate={cnv.startDate}
            ></ConversationCard>
          );
        })}
      </>
    );
  }
};

export default ConversationsList;
