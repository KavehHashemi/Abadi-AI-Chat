import "../../style/style.scss";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";

const Account = () => {
  const { user, logout, loginWithRedirect } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  if (user)
    return (
      <>
        <Button onClick={handleClick}>{user.nickname}</Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <CardContent sx={{ cursor: "pointer" }} onClick={() => logout()}>
            Logout
          </CardContent>
        </Popover>
      </>
    );
  else {
    return <Button onClick={() => loginWithRedirect()}>login</Button>;
  }
};

export default Account;
