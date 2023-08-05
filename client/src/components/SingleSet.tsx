import "../style/style.scss";
import { SetType } from "../types";
import { Link } from "react-router-dom";
import { handleDate } from "../utils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentSet } from "../store/sets";
import EditSetDialog from "./EditSetDialog";
import DeleteSetDialog from "./DeleteSetDialog";

const SingleSet = ({ id, name, createdAt, lastReading, cards }: SetType) => {
  const dispatch = useAppDispatch();
  const { isLightMode } = useAppSelector((state) => state.mode);
  const handleClick = () => {
    dispatch(setCurrentSet({ name, id }));
  };

  return (
    <div className={isLightMode ? "card-l" : "card"}>
      <div id={id} onClick={() => handleClick()}>
        <Link to={`/sets/${name}`}>
          <div>{name}</div>
          <div>{handleDate(createdAt)}</div>
          <div>{handleDate(lastReading)}</div>
          <div>{cards.length}</div>
        </Link>
      </div>
      <div className="card-actions">
        <EditSetDialog oldName={name} id={id}></EditSetDialog>
        <DeleteSetDialog id={id} name={name}></DeleteSetDialog>
      </div>
    </div>
  );
};

export default SingleSet;
