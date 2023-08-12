import { handleDate } from "../utils";
import { useNavigate } from "react-router-dom";
import { setCurrentConversation } from "../store/conversation";
import { useAppDispatch } from "../store/hooks";
import { Card, CardContent, Typography } from "@mui/material";

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
    <Card id={id} onClick={handleClick}>
      <CardContent>
        <Typography color="primary">{title}</Typography>
        <Typography variant="caption" color="GrayText">
          {handleDate(startDate)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
