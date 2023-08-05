import { handleDate } from "../utils";

type props = {
  owner: string;
  text: string;
  date: string;
  id: string;
};
const SingleMessage = ({ id, date, owner, text }: props) => {
  return (
    <div
      id={id}
      style={{
        padding: "1rem",
        border: "1px solid #555",
        borderRadius: "0.5rem",
        backgroundColor: "#222",
      }}
    >
      <div>{owner}</div>
      <div>{text}</div>
      <div>{handleDate(date)}</div>
    </div>
  );
};

export default SingleMessage;
