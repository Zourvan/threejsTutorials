import { defineConfig } from 'vite';

export default defineConfig({
  root: 'programs/1-Camera-FOV', // به صورت پیش‌فرض برنامه اول اجرا می‌شود
  build: {
    outDir: '../../dist/1-Camera-FOV', // پوشه‌ خروجی برنامه را مشخص کنید
  },
});
