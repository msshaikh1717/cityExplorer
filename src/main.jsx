import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import AppReactQuiz from "./AppReactQuiz";
// import AppBankAccChallenge from "./AppBankAccChallenge";
// import AppDateCounter from "./AppDateCounter";
import AppCityExplorer from "./CityExplorer/AppCityExplorer";
// import AppAtomicBlog from "./AppAtomicBlog";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <AppDateCounter /> */}
      {/* <AppReactQuiz /> */}
      {/* <AppBankAccChallenge /> */}

      <AppCityExplorer />
      {/* <AppAtomicBlog /> */}
    </Provider>
  </StrictMode>,
);
