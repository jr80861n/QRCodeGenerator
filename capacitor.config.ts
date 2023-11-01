import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'qr.code.generator',
  appName: 'qr-code-generator',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
