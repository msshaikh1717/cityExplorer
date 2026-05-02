import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import AppReactQuiz from "./AppReactQuiz";
// import AppBankAccChallenge from "./AppBankAccChallenge";
// import AppDateCounter from "./AppDateCounter";
import AppWorldWise from "./WorldWise/AppWorldWise";
// import AppAtomicBlog from "./AppAtomicBlog";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <AppDateCounter /> */}
      {/* <AppReactQuiz /> */}
      {/* <AppBankAccChallenge /> */}

      <AppWorldWise />
      {/* <AppAtomicBlog /> */}
    </Provider>
  </StrictMode>,
);
