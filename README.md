# Numerology Web

수비학 앱을 정적 웹 리소스(`HTML`, `CSS`, `JavaScript`)로 옮긴 프로젝트입니다.

## 파일 구성

- `index.html`: 웹 페이지 구조
- `styles.css`: 반응형 스타일
- `script.js`: Swift 계산 로직을 옮긴 수비학 계산 코드

## 로컬 실행

정적 파일이라 브라우저에서 `index.html`을 직접 열어도 되고, 간단한 서버로 실행해도 됩니다.

```bash
python3 -m http.server 8000
```

그 뒤 브라우저에서 `http://localhost:8000`으로 접속하면 됩니다.

## GitHub Pages 배포

### 1. GitHub 저장소 생성

GitHub에서 새 저장소를 만들고, 이 디렉토리를 연결합니다.

```bash
git init
git add .
git commit -m "Add static numerology website"
git branch -M main
git remote add origin https://github.com/<your-account>/<repo>.git
git push -u origin main
```

### 2. Pages 활성화

GitHub 저장소의 `Settings > Pages`로 이동합니다.

- `Source`: `Deploy from a branch`
- `Branch`: `main`
- `Folder`: `/ (root)`

저장 후 1~3분 정도 지나면 다음 주소로 접속할 수 있습니다.

```text
https://<your-account>.github.io/<repo>/
```

### 3. 사용자 저장소명 예외

저장소 이름이 `<your-account>.github.io`라면 주소는 아래처럼 됩니다.

```text
https://<your-account>.github.io/
```
