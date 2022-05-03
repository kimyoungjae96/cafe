import React, { useState } from 'react';
import { ScrollView, StatusBar, SafeAreaView } from 'react-native';

import { Text, View } from '@/components';
import { BottomButton, EatingMenu, PurposeOfVisit } from '@/components/record';
import { IEatingMenu, IPurposeOfVisit } from '@/models';
import FastImage from 'react-native-fast-image';
import { backIcon } from '@/assets/images';

enum Step {
  'PurposeOfVisit',
  'Menu',
  'Feel',
  'Review',
  'Score',
}

const defaultPurposeOfVisit = [
  {
    key: 'study',
    description: '공부',
    question: '공부하기 괜찮으셨나요?',
    score: 0,
  },
  {
    key: 'conversation',
    description: '대화',
    question: '대화하기 괜찮으셨나요?',
    score: 0,
  },
  {
    key: 'date',
    description: '데이트',
    question: '데이트하기 괜찮으셨나요?',
    score: 0,
  },
  {
    key: 'etc',
    description: '기타',
    question: '전반적으로 카페는 어떠셨나요?',
    score: 0,
  },
];

const defaultEatingMenus = [
  {
    key: 'coffee',
    description: '커피',
    question: '커피는 어떠셨나요?',
    score: 0,
  },
  {
    key: 'beverage',
    description: '음료',
    question: '음료는 어떠셨나요?',
    score: 0,
  },
  {
    key: 'bakery',
    description: '베이커리',
    question: '베이커리는 어떠셨나요?',
    score: 0,
  },
  {
    key: 'etc',
    description: '기타',
    question: '전반적으로 맛이 어떠셨나요?',
    score: 0,
  },
];

const Record = () => {
  const [step, setStep] = useState(Step.PurposeOfVisit);
  const [selectedPurposes, setSelectedPurposes] = useState<Set<string>>(
    new Set(),
  );
  const [purposesOfVisit, setPurposesOfVisit] = useState<IPurposeOfVisit[]>(
    defaultPurposeOfVisit,
  );

  const [selectedEatingMenus, setSelectedEatingMenus] = useState<Set<string>>(
    new Set(),
  );
  const [eatingMenus, setEatingMenus] =
    useState<IEatingMenu[]>(defaultEatingMenus);

  const nextButtonDisabled = () =>
    purposesOfVisit.every(purpose => purpose.score === 0);

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
      <SafeAreaView
        style={{ backgroundColor: '#F6F6F6', flex: 1, position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            height: 200,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
        <StatusBar barStyle="dark-content" />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 80 }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingTop: 12,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FastImage source={backIcon} style={{ width: 21, height: 17 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text>{step + 1}</Text>
              <Text>/5</Text>
            </View>
          </View>
          {step === Step.PurposeOfVisit && (
            <PurposeOfVisit
              purposesOfVisit={purposesOfVisit}
              selectedPurposes={selectedPurposes}
              setPurposesOfVisit={setPurposesOfVisit}
              setSelectedPurposes={setSelectedPurposes}
            />
          )}
          {step === Step.Menu && (
            <EatingMenu
              eatingMenus={eatingMenus}
              selectedEatingMenus={selectedEatingMenus}
              setEatingMenus={setEatingMenus}
              setSelectedEatingMenus={setSelectedEatingMenus}
            />
          )}
        </ScrollView>
        <BottomButton
          disabled={nextButtonDisabled()}
          onClickNext={() => {
            setStep(prevStep => prevStep + 1);
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Record;
