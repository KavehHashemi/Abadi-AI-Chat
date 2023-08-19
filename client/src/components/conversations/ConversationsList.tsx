import { useQuery } from "@apollo/client";
import { CONVERSATIONS_QUERY } from "../../graphql";
import { useAuth0 } from "@auth0/auth0-react";
import ConversationCard from "./ConversationCard";
import NewConversation from "./NewConversation";
import { ConversationType } from "../../types";
import "../../style/style.scss";
import { setCurrentConversation } from "../../store/conversation";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";

const ConversationsList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrentConversation({ id: null, name: null }));
  }, []);
  const { user } = useAuth0();
  const { data, loading, error } = useQuery(CONVERSATIONS_QUERY, {
    variables: { userID: user?.sub?.split("|")[1] },
  });
  if (loading) return <div className="loading">Loading</div>;
  if (error) return <div className="error">{error.message}</div>;
  else {
    return (
      <div className="conversations-container">
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
        <div className="cards-container"></div>
      </div>
    );
  }
};

export default ConversationsList;
