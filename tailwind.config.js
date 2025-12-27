module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ← 이게 핵심!!! 모든 React 파일 스캔해서 Tailwind 클래스 적용
  ],
  theme: {
    extend: {
      colors: {
        'wccw-purple': '#6B46C1',  // 너 테마 보라색
        'wccw-yellow': '#FACC15',  // 노란색
      },
    },
  },
  plugins: [],
}