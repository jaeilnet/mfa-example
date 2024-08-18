import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.app.json" }),
  ],
  build: {
    outDir: "./dist",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "shell-router",
      fileName: (format) => `shell-router.${format}.js`,
    },
    rollupOptions: {
      // react-router-dom
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
