import React, {useState} from 'react';
import {SafeAreaView, View, Text, Button, TouchableOpacity} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import {kakaoSymbol} from './src/assets/images';
import FastImage from 'react-native-fast-image';

const App = () => {
  const [result, setResult] = useState<string>('');
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getKakaoProfile();

    setResult(JSON.stringify(profile));
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
  };

  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient}>
        <View style={{margin: 16}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FEE500',
              height: 48,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              source={kakaoSymbol}
              style={{width: 32, height: 32, position: 'absolute', left: 12}}
              resizeMode="contain"></FastImage>
            <Text style={{color: '#191919', fontSize: 16, fontWeight: 'bold'}}>
              카카오톡으로 계속하기
            </Text>
          </TouchableOpacity>
          <Button
            title="카카오톡으로 계속하기"
            onPress={() => {
              signInWithKakao();
            }}></Button>
          <Button
            title="정보 불러오기"
            onPress={() => {
              getProfile();
            }}></Button>
        </View>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
