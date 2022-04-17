import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
  Alert,
  Keyboard,
} from 'react-native';

import { isIOS, theme } from '@/infra';
import { TextInput, Dot } from '@/components';
import { userApi } from '@/api/UserApi';
import { useUserStore } from '@/stores';

const enum STEP {
  name,
  nickname,
  id,
  password,
  residentRegistrationNumber,
  done,
}

// 주민번호 앞자리 + 뒷자리 1개, 이름 (선택), 닉네임 (중복 체크 필요, 10자리), 휴대폰 번호, 아이디, 비밀번호
const SignUp = () => {
  const [step, setStep] = useState(STEP.name);
  const [formData, setFormData] = useState({
    name: { value: '', errorMessage: '' },
    nickname: { value: '', errorMessage: '' },
    id: { value: '', errorMessage: '' },
    password: { value: '', errorMessage: '' },
    frontResidentRegistrationNumber: { value: '', errorMessage: '' },
    seventhDigitOfResidentRegistrationNumber: { value: '', errorMessage: '' },
  });
  const setToken = useUserStore(state => state.setToken);

  const seventhDigitOfResidentRegistrationNumberRef = useRef<RNTextInput>(null);

  useEffect(() => {
    if (formData.frontResidentRegistrationNumber.value.length === 6) {
      seventhDigitOfResidentRegistrationNumberRef?.current?.focus();
    }
  }, [formData]);

  useEffect(() => {
    if (step === STEP.done) {
      Keyboard.dismiss();
    }
  }, [step]);

  const validate = () => {
    if (step >= STEP.name) {
      if (formData.name.value === '') {
        setError('name', '이름을 입력해주세요');
        return false;
      }
      setError('name', '');
    }

    if (step >= STEP.nickname) {
      if (formData.nickname.value === '') {
        setError('nickname', '닉네임을 입력해주세요');
        return false;
      }
      setError('nickname', '');
    }

    if (step >= STEP.id) {
      if (formData.id.value === '') {
        setError('id', '아이디를 입력해주세요');
        return false;
      }
      setError('id', '');
    }

    if (step >= STEP.password) {
      if (formData.password.value === '') {
        setError('password', '비밀번호를 입력해주세요');
        return false;
      }
      setError('password', '');
    }

    if (step >= STEP.residentRegistrationNumber) {
      if (formData.frontResidentRegistrationNumber.value === '') {
        setError(
          'frontResidentRegistrationNumber',
          '주민등록번호를 입력해주세요',
        );
        return false;
      }
      setError('frontResidentRegistrationNumber', '');
    }

    return true;
  };

  const getTitle = (currentStep: STEP) => {
    return {
      [STEP.name]: () => '이름을 입력해주세요',
      [STEP.nickname]: () => '닉네임을 입력해주세요 :)',
      [STEP.id]: () => '닉네임을 입력해주세요 :)',
      [STEP.password]: () => '닉네임을 입력해주세요 :)',
      [STEP.residentRegistrationNumber]: () => '닉네임을 입력해주세요 :)',
      [STEP.done]: () => '입력한 정보를 확인해주세요 :)',
    }[currentStep]();
  };

  const setError = (
    key:
      | 'name'
      | 'nickname'
      | 'id'
      | 'password'
      | 'frontResidentRegistrationNumber'
      | 'seventhDigitOfResidentRegistrationNumber',
    errorMessage: string,
  ) => {
    const newData = {
      ...formData,
    };

    newData[key].errorMessage = errorMessage;

    setFormData(newData);
  };

  const onChangeText = (
    key:
      | 'name'
      | 'nickname'
      | 'id'
      | 'password'
      | 'frontResidentRegistrationNumber'
      | 'seventhDigitOfResidentRegistrationNumber',
    value: string,
  ) => {
    const newData = {
      ...formData,
    };
    newData[key].value = value;

    setFormData(newData);
  };

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableWithoutFeedback>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
              <Text style={styles.title}>{getTitle(step)}</Text>

              {step === STEP.done && (
                <Text style={[styles.inputLabel, { marginTop: 0 }]}>
                  주민등록번호
                </Text>
              )}

              {step >= STEP.residentRegistrationNumber && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        autoFocus
                        keyboardType="number-pad"
                        placeholder="YYMMDD"
                        value={formData.frontResidentRegistrationNumber.value}
                        onChangeText={value =>
                          onChangeText('frontResidentRegistrationNumber', value)
                        }
                        errorMessage={
                          formData.frontResidentRegistrationNumber.errorMessage
                        }
                        maxLength={6}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 24,
                        paddingHorizontal: 8,
                      }}>
                      -
                    </Text>
                    <TextInput
                      ref={seventhDigitOfResidentRegistrationNumberRef}
                      style={{ width: 24 }}
                      maxLength={1}
                      keyboardType="number-pad"
                      value={
                        formData.seventhDigitOfResidentRegistrationNumber.value
                      }
                      onChangeText={value => {
                        onChangeText(
                          'seventhDigitOfResidentRegistrationNumber',
                          value,
                        );
                        setStep(STEP.done);
                      }}
                      errorMessage={
                        formData.seventhDigitOfResidentRegistrationNumber
                          .errorMessage
                      }
                    />
                    {[...new Array(6).keys()].map(i => (
                      <Dot
                        key={i}
                        backgroundColor={theme['color-gray-300']}
                        width={18}
                        height={18}
                        borderRadius={18}
                        style={{ alignSelf: 'center', marginHorizontal: 1 }}
                      />
                    ))}
                  </View>
                  <Text style={styles.inputLabel}>비밀번호</Text>
                </>
              )}

              {step >= STEP.password && (
                <>
                  <TextInput
                    autoFocus
                    secureTextEntry
                    placeholder="사용하실 비밀번호를 입력해주세요"
                    textContentType="password"
                    value={formData.password.value}
                    onChangeText={value => onChangeText('password', value)}
                    errorMessage={formData.password.errorMessage}
                  />
                  <Text style={styles.inputLabel}>아이디</Text>
                </>
              )}

              {step >= STEP.id && (
                <>
                  <TextInput
                    autoFocus
                    placeholder="사용하실 아이디를 입력해주세요"
                    value={formData.id.value}
                    onChangeText={value => onChangeText('id', value)}
                    errorMessage={formData.id.errorMessage}
                  />
                  <Text style={styles.inputLabel}>닉네임</Text>
                </>
              )}

              {step >= STEP.nickname && (
                <>
                  <TextInput
                    autoFocus
                    placeholder="최대 10자리까지 입력이 가능해요"
                    value={formData.nickname.value}
                    onChangeText={value => onChangeText('nickname', value)}
                    errorMessage={formData.nickname.errorMessage}
                  />
                  <Text style={styles.inputLabel}>이름</Text>
                </>
              )}

              <TextInput
                autoFocus
                placeholder="이름을 입력해주세요"
                value={formData.name.value}
                onChangeText={value => onChangeText('name', value)}
                errorMessage={formData.name.errorMessage}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={{
            backgroundColor: theme['color-primary-500'],
            width: '90%',
            height: 48,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginBottom: 16,
          }}
          onPress={async () => {
            if (!validate()) {
              return;
            }

            if (step === STEP.done) {
              // TODO api 호출
              const {
                id,
                password,
                name,
                nickname,
                frontResidentRegistrationNumber,
                seventhDigitOfResidentRegistrationNumber,
              } = formData;
              try {
                const res = await userApi.signUp({
                  id: id.value,
                  password: password.value,
                  name: name.value,
                  nickname: nickname.value,
                  frontResidentRegistrationNumber:
                    frontResidentRegistrationNumber.value,
                  seventhDigitOfResidentRegistrationNumber: Number(
                    seventhDigitOfResidentRegistrationNumber.value,
                  ),
                });
                Alert.alert('회원가입 성공');
              } catch (e) {
                Alert.alert(String(e));
              }
              return;
            }
            setStep(step + 1);
          }}>
          <Text style={{ color: 'white' }}>다음</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  title: { fontSize: 23, fontWeight: 'bold', marginBottom: 26, marginTop: 24 },
  inputLabel: {
    color: theme['color-gray-500'],
    marginBottom: 12,
    marginTop: 40,
  },
});
