import { handleDate } from "../utils";

type SingleMessageProps = {
  date: string;
  isAI: boolean;
  text: string;
};

const SingleMessage = ({ date, isAI, text }: SingleMessageProps) => {
  return (
    <div>
      <div>{text}</div>
      <div>{handleDate(date)}</div>
      <hr></hr>
    </div>
  );
};

export default SingleMessage;
