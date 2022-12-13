import React from "react";
import { Configuration, OpenAIApi } from "openai";
import Home from "./pages/Home";
import ConvertCode from "./pages/ConvertCode";
import ExplainCode from "./pages/ExplainCode";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";

function App() {
  const configration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configration);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/convertCode"
          element={<ConvertCode openAiConfig={openai} />}
        ></Route>
        <Route
          path="/explainCode"
          element={<ExplainCode openAiConfig={openai} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
