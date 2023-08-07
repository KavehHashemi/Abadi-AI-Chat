import "./style/style.scss";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightThemeOptions, darkThemeOptions } from "./Themes";

import Paper from "@mui/material/Paper";
import Navbar from "./components/navbar/Navbar";

import { useAuth0 } from "@auth0/auth0-react";
import ConversationsList from "./components/ConversationsList";
import Conversation from "./components/Conversation";
// import { useEffect } from "react";

const App = () => {
  const { isLightMode } = useAppSelector((state) => state.mode);
  const darkTheme = createTheme(darkThemeOptions);
  const lightTheme = createTheme(lightThemeOptions);
  // const { currentConversation } = useAppSelector((state) => state.conversation);
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <Paper sx={{ minHeight: "100dvh" }}>
        <Navbar isLightMode={isLightMode}></Navbar>
        {isLoading ? (
          <>loading</>
        ) : isAuthenticated ? (
          <Routes>
            <Route
              path="/"
              element={<ConversationsList></ConversationsList>}
            ></Route>
            <Route
              path={`/conversation`}
              element={<Conversation></Conversation>}
            ></Route>
          </Routes>
        ) : (
          <div className="login">you need to login first</div>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default App;
