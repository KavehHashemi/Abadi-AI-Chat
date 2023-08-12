import Account from "./Account";
import ModeSwitch from "./ModeSwitch";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../style/style.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentConversation } from "../../store/conversation";
import { Typography } from "@mui/material";
type props = {
  isLightMode: boolean;
};

const Navbar = ({ isLightMode }: props) => {
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    dispatch(setCurrentConversation(null));
  };
  return (
    <AppBar position="relative">
      <Toolbar className="navbar">
        {currentConversation ? (
          <BackIcon
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          ></BackIcon>
        ) : (
          <Typography variant="h6" fontWeight="bold" color="whitesmoke">
            Home
          </Typography>
        )}
        <Toolbar sx={{ gap: "1rem" }}>
          <Account></Account>
          <ModeSwitch isLightMode={isLightMode}></ModeSwitch>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
