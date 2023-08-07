import Account from "./Account";
import ModeSwitch from "./ModeSwitch";
import { AppBar, Toolbar } from "@mui/material";

type props = {
  isLightMode: boolean;
};

const Navbar = ({ isLightMode }: props) => {
  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Toolbar sx={{ gap: "1rem" }}>
          <Account></Account>
          <ModeSwitch isLightMode={isLightMode}></ModeSwitch>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
