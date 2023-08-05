import "./style/style.scss";
import { Link, Routes, Route } from "react-router-dom";
// import Sets from "./components/Sets";
import { useAppDispatch, useAppSelector } from "./store/hooks";
// import Cards from "./components/Cards";
// import Arrow from "@mui/icons-material/ChevronRight";
import Switch from "@mui/material/Switch";
import Light from "@mui/icons-material/LightMode";
import Dark from "@mui/icons-material/DarkMode";
import { setLightMode } from "./store/mode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import Feed from "./components/Feed";
import Ex from "./components/ex";

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user, logout, loginWithRedirect } =
    useAuth0();
  const { isLightMode } = useAppSelector((state) => state.mode);

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: isLightMode ? "#242424" : "#f5f5f5",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isLightMode ? "#fff" : "#242424",
            // color: isLightMode ? "#242424" : "#f5f5f5",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            <Route path="/ex" element={<Ex></Ex>}></Route>
          </Routes>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>login</button>
      )}
    </ThemeProvider>
  );
};

export default App;
