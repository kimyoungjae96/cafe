import {default as RNCodePush} from 'react-native-code-push';
export const codePush = (app: any) => {
  if (__DEV__) {
    return app;
  }

  return RNCodePush({
    checkFrequency: RNCodePush.CheckFrequency.ON_APP_RESUME,
    installMode: RNCodePush.InstallMode.ON_NEXT_RESTART,
    mandatoryInstallMode: RNCodePush.InstallMode.IMMEDIATE,
  })(app);
};
