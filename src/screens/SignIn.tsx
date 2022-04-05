import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import FastImage from 'react-native-fast-image';
import { appleSymbol, kakaoSymbol } from '../assets/images';

const SignIn = () => {
  const [result, setResult] = useState<string>('');
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  async function onAppleButtonPress() {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
    } catch (e) {
      alert(e);
    }
  }

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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginHorizontal: 16,
          flex: 1,
          justifyContent: 'center',
          top: -48,
        }}>
        <TouchableOpacity
          onPress={() => {
            signInWithKakao();
          }}
          style={{
            backgroundColor: '#FEE500',
            height: 48,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={kakaoSymbol}
            style={{ width: 32, height: 32, position: 'absolute', left: 12 }}
            resizeMode="contain"></FastImage>
          <Text style={{ color: '#191919', fontSize: 16, fontWeight: 'bold' }}>
            카카오톡으로 계속하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onAppleButtonPress()}
          style={{
            backgroundColor: '#000',
            height: 48,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <FastImage
            source={appleSymbol}
            style={{ width: 32, height: 32, position: 'absolute', left: 12 }}
            resizeMode="contain"></FastImage>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Apple로 계속하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onAppleButtonPress()}
          style={{
            backgroundColor: '#5e5e5e',
            height: 48,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            이메일로 계속하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
