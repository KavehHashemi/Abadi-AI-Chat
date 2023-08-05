import "./style/style.scss";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks";

import Switch from "@mui/material/Switch";
import Light from "@mui/icons-material/LightMode";
import Dark from "@mui/icons-material/DarkMode";
import { setLightMode } from "./store/mode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightThemeOptions, darkThemeOptions } from "./Themes";
import { useAuth0 } from "@auth0/auth0-react";
import Feed from "./components/Feed";

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user, logout, loginWithRedirect } =
    useAuth0();
  const { isLightMode } = useAppSelector((state) => state.mode);

  const darkTheme = createTheme(darkThemeOptions);
  const lightTheme = createTheme(lightThemeOptions);

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      {isLoading ? (
        <div>Loading...</div>
      ) : isAuthenticated ? (
        <div className={isLightMode ? "app-l" : "app"}>
          <nav className="navbar">
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {user ? (
                <div onClick={() => logout()}>{user?.nickname}</div>
              ) : (
                <div></div>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Dark fontSize="small"></Dark>
                <Switch
                  color="default"
                  checked={isLightMode}
                  onChange={() => dispatch(setLightMode(!isLightMode))}
                ></Switch>
                <Light fontSize="small"></Light>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Feed></Feed>}></Route>
          </Routes>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>login</button>
      )}
    </ThemeProvider>
  );
};

export default App;
