# Ui-Kit Icons 설정

### Icons 만들기

편의상 icons 패키지를 사용

> pnpm --filter @career-up/ui-kit add react-icons

icons 컴포넌트를 생성 후 각 import export 한다.

```tsx
import Home from "./icons/Home";
import Briefcase from "./icons/Briefcase";
import LaptopCode from "./icons/LaptopCode";
import UserFriends from "./icons/UserFriends";

const Icons = {
  Home,
  Briefcase,
  UserFriends,
  LaptopCode,
};

export default Icons;
```

원래 내보내던 index.ts 에서 추가시켜준다.

```ts
import "./global.css";

import Button from "./components/Button";
import Icons from "./components/Icons";

export { Button, Icons };
```
