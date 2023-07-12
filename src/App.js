import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ResetCss from "./assets/Style/ResetCss.js";
import GlobalStyle from "./assets/Style/GlobalStyle.js";

function App() {
  return (
    <BrowserRouter>
      <ResetCss/>
      <GlobalStyle/>

      <NavBar />

      <Routes>
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
