# Ui-Kit 초기 설정

### Button 만들기

**button component**

```tsx
// src/components/Button.tsx

const Button = () => {
  return <button>Click me Button</button>;
};

export default Button;
```

**css**

적용 여부를 확인할 테스트용 css

```css
/* root/src/global.css */

body {
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  font-size: 3rem;
  margin: auto;
  max-width: 800px;
  margin-top: 20px;
}
```

**lib file 설정**

외부에서 접근할 library root file 생성

```ts
// root/src/index.ts

import "./global.css";

export { default as Button } from "./components/Button";
```

**vite.config.ts 설정**

```terminal
<!-- type 파일 생성을 위한 플러그인 설치-->

> pnpm --filter @career-up/ui-kit add vite-plugin-dts -D
```

dts plugin 설정

```ts
dts({
  rollupTypes: true,
  // tsconfigPath: "./tsconfig.app.json" 설정을 하지 않으면 빌드 시에 d.ts 파일이 비어있다.
  tsconfigPath: "./tsconfig.app.json",
});
```

build 옵션 설정

```ts
// vite.config.ts

 build: {
    // build 추출 경로
    outDir: "./dist",
    // lib 설정
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "uk-kit",
      fileName: (format) => `ui-kit.${format}.js`,
    },
    rollupOptions: {
      // 내부 패키지에 포함하지 않고 v외부에서 사용하도록 빌드시 포함 x
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // css 파일네임에 관한 설정
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }

          return chunkInfo.name!;
        },
      },
    },
  },
```

**vite.config.ts 설정**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  root: "./",
  build: {
    outDir: "./dist",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "uk-kit",
      fileName: (format) => `ui-kit.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }

          return chunkInfo.name!;
        },
      },
    },
  },
});
```

**package.json 설정**

```json

{
  ...package.json,
  "types": "./dist/ui-kit.d.ts",
  "main": "./dist/ui-kit.umd.js",
  "module": "./dist/ui-kit.es.js",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "types": "./dist/ui-kit.d.ts",
      "import": "./dist/ui-kit.es.js",
      "require": "./dist/ui-kit.umd.js"
    },
    "./index.css": "./dist/index.css"
  },

  // dependencies 에서 peerDependencies 로 변경
  // 아까 빌드 옵션에서 외부에 의존하도록 설정했기 때문에 peerDependencies 설정
  "peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
}

```
