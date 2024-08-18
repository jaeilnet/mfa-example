import React from "react";
import App from "./App";

import { createRoot } from "react-dom/client";

import "@career-up/ui-kit/index.css";
import "./index.css";

createRoot(document.getElementById("app")!).render(<App />);
