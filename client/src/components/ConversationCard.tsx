import { handleDate } from "../utils";
import { useNavigate } from "react-router-dom";
import { setCurrentConversation } from "../store/conversation";
import { useAppDispatch } from "../store/hooks";

type conversationProps = {
  id: string;
  title: string;
  startDate: string;
  lastDate: string;
};

const ConversationCard = ({
  id,
  lastDate,
  startDate,
  title,
}: conversationProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(setCurrentConversation(id));
    navigate("/conversation");
  };

  return (
    <div id={id} onClick={handleClick}>
      <div>title: {title}</div>
      <div>start date: {handleDate(startDate)}</div>
      <hr></hr>
    </div>
  );
};

export default ConversationCard;
