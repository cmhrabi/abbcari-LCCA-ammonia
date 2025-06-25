"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Text from "./design/Text/Text";
import Button from "./design/Button/Button";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-b4h011ic71qc07ws.us.auth0.com"
      clientId="xxPlVCzXA2o3M1y0EnFgFdiQuRYtEP3R"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/analysis/start`,
      }}
    >
      <HeroUIProvider>
        <ToastProvider placement="bottom-center" />
        <BrowserRouter>
          <Provider store={store}>
            <ErrorBoundary
              fallback={
                <div className="pt-40 justify-items-center w-full space-y-4">
                  <ExclamationCircleIcon className="text-danger size-10" />
                  <Text color="secondary" textSize="h2">
                    Error occurred please go to home page
                  </Text>
                  <Button
                    onClick={() =>
                      window.open(`${process.env.REACT_APP_FRONTEND_URL}`)
                    }
                  >
                    Home
                  </Button>
                </div>
              }
            >
              <App />
            </ErrorBoundary>
          </Provider>
        </BrowserRouter>
      </HeroUIProvider>
    </Auth0Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
