import Switch from "@mui/material/Switch";
import Light from "@mui/icons-material/LightMode";
import Dark from "@mui/icons-material/DarkMode";
import { setLightMode } from "../../store/mode";
import { useAppDispatch } from "../../store/hooks";

type props = {
  isLightMode: boolean;
};

const ModeSwitch = ({ isLightMode }: props) => {
  const dispatch = useAppDispatch();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dark fontSize="small"></Dark>
      <Switch
        color="default"
        checked={isLightMode}
        onChange={() => dispatch(setLightMode(!isLightMode))}
      ></Switch>
      <Light fontSize="small"></Light>
    </div>
  );
};

export default ModeSwitch;
