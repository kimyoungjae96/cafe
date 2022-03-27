/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {codePush} from './src/infra/codepush';

AppRegistry.registerComponent(appName, () => codePush(App));
