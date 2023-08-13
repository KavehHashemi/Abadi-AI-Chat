import { Card, CardContent, Paper, Typography } from "@mui/material";
import { handleDate } from "../utils";
import "../style/style.scss";

type SingleMessageProps = {
  date: string;
  isAI: boolean;
  text: string;
};

const SingleMessage = ({ date, isAI, text }: SingleMessageProps) => {
  return (
    <div
      className={
        isAI ? "single-message-container-a" : "single-message-container-h"
      }
    >
      {/* <Card className={isAI ? "single-message-a" : "single-message-h"}> */}
      <Card className="single-message">
        <CardContent>
          <Typography color={isAI ? "secondary" : "primary"}>{text}</Typography>
          <Typography variant="caption" color="GrayText">
            {handleDate(date)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleMessage;
