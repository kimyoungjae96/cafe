import { Dimensions, Platform } from 'react-native';

export const SERVER_BASE_URL = 'http://api.cafe-zip.cf/';

export const isIOS = Platform.OS === 'ios';
export const isAOS = Platform.OS === 'android';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
