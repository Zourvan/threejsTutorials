import { defineConfig } from 'vite';

export default defineConfig({
  root: 'programs/2-Camera-near', // به صورت پیش‌فرض برنامه اول اجرا می‌شود
  build: {
    outDir: '../../dist/2-Camera-near', // پوشه‌ خروجی برنامه را مشخص کنید
  },
});
