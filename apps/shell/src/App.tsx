import React from "react";
import ReactDOM from "react-dom/client";

import "@career-up/ui-kit/index.css";

import { Button, Icons } from "@career-up/ui-kit";
import { test } from "@career-up/shell-router";

test();
const App = () => {
  return (
    <div className="container">
      <div>Name: shell</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Empty CSS</div>
      <Button>Button</Button>

      <Icons.Home />
    </div>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
