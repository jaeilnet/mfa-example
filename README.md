# MFA 서비스 실습하기

## Step1 모노레포 세팅

### 초기세팅 하기

```
pnpm init

corepack use pnpm@8version
```

**디렉토리 생성**

```
apps

<!-- 일단 빈 디렉토리로 생성 -->
packages
```

**workspace 생성**

```yaml
# pnpm-workspace.yaml

packages:
    - "apps/\*"
    - "packages/\*"
```

**MFA 앱 생성**

```
<!-- shell 디렉토리로 이동 -->
cd apps

<!-- mf-app 생성 -->
pnpm create mf-app
```

mf-app 생성  
프로젝트 이름 shell, 포트는 3000번,  
템플릿을 react, typescript, css 로 설정한다.

### Turbo 설치

```
<!-- root -->
pnpm -w add turbo -D

<!-- turbo.json 파일 생성 -->
turbo.json
```

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      // build를 먼저 실행한다 의존한다
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "start:live": {
      // 아래 두가지 속성은 데브모드에 적합한 속성이다.

      // 작업을 캐시하지 않는다.
      "cache": false,
      // 지속성을 의미하는데 계속 모니터링 한다는 의미
      "persistent": true
    },
    "build:start": {
      "cache": false,
      "persistent": true
    }
  }
}
```

스키마와 하위 마이크로 앱들을 병렬로 실행할 각 명령어들을 세팅해준다.

# mfa-example
