import { setLightMode } from "../../store/mode";
import { useAppDispatch } from "../../store/hooks";

type props = {
  isLightMode: boolean;
};

const ModeSwitch = ({ isLightMode }: props) => {
  const dispatch = useAppDispatch();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(setLightMode(!isLightMode))}
      >
        {isLightMode ? (
          <img width="16" src="/dark.svg"></img>
        ) : (
          <img width="16" src="/light.svg"></img>
        )}
      </div>
      {/* <Dark fontSize="small"></Dark>
      <Switch
        color="default"
        checked={isLightMode}
        onChange={() => dispatch(setLightMode(!isLightMode))}
      ></Switch>
      <Light fontSize="small"></Light> */}
    </div>
  );
};

export default ModeSwitch;
