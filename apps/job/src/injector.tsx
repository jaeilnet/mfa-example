import { injectFactory } from "@career-up/shell-router";
import { routes } from "./router";

const inject = injectFactory({
  routes,
});

export default inject;
