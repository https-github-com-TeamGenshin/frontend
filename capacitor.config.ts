import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Cab Finder',
  webDir: 'build',
  server: {
    androidScheme: "http",
    allowNavigation: [
      "http://192.168.1.11:5000"
    ]
  }
};

export default config;
