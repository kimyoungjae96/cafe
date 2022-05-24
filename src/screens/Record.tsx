import React, { useState } from 'react';
import { ScrollView, StatusBar, SafeAreaView } from 'react-native';

import { Text, TouchableOpacity, View } from '@/components';
import {
  BottomButton,
  EatingMenu,
  Feeling,
  PurposeOfVisit,
} from '@/components/record';
import { IEatingMenu, IPurposeOfVisit } from '@/models';
import FastImage from 'react-native-fast-image';
import {
  backIcon,
  defaultBakery,
  defaultBeverage,
  defaultCoffee,
  defaultConversation,
  defaultDate,
  defaultEtc,
  defaultStudy,
  feelingBackground,
  selectedBakery,
  selectedBeverage,
  selectedCoffee,
  selectedConversation,
  selectedDate,
  selectedEtc,
  selectedStudy,
} from '@/assets/images';
import StarRating from '@/components/record/StarRating';
import { TopBackNavigation } from '@/components/common/TopBackNavigation';
import { useNavigation } from '@react-navigation/native';

enum Step {
  'PurposeOfVisit',
  'Menu',
  'Feel',
  'StarRating',
  'Score',
}

export const defaultPurposeOfVisit = [
  {
    key: 'study',
    description: '공부',
    question: '공부하기 괜찮으셨나요?',
    score: 0,
    defaultImage: defaultStudy,
    selectedImage: selectedStudy,
  },
  {
    key: 'conversation',
    description: '대화',
    question: '대화하기 괜찮으셨나요?',
    score: 0,
    defaultImage: defaultConversation,
    selectedImage: selectedConversation,
  },
  {
    key: 'date',
    description: '데이트',
    question: '데이트하기 괜찮으셨나요?',
    score: 0,
    defaultImage: defaultDate,
    selectedImage: selectedDate,
  },
  {
    key: 'etc',
    description: '기타',
    question: '전반적으로 카페는 어떠셨나요?',
    score: 0,
    defaultImage: defaultEtc,
    selectedImage: selectedEtc,
  },
];

const defaultEatingMenus = [
  {
    key: 'coffee',
    description: '커피',
    question: '커피는 어떠셨나요?',
    score: 0,
    defaultImage: defaultCoffee,
    selectedImage: selectedCoffee,
  },
  {
    key: 'beverage',
    description: '음료',
    question: '음료는 어떠셨나요?',
    score: 0,
    defaultImage: defaultBeverage,
    selectedImage: selectedBeverage,
  },
  {
    key: 'bakery',
    description: '베이커리',
    question: '베이커리는 어떠셨나요?',
    score: 0,
    defaultImage: defaultBakery,
    selectedImage: selectedBakery,
  },
  {
    key: 'etc',
    description: '기타',
    question: '전반적으로 맛이 어떠셨나요?',
    score: 0,
    defaultImage: defaultEtc,
    selectedImage: selectedEtc,
  },
];

const Record = () => {
  const [step, setStep] = useState(Step.PurposeOfVisit);
  const [score, setScore] = useState(0);
  const [selectedPurposes, setSelectedPurposes] = useState<Set<string>>(
    new Set(),
  );
  const [purposesOfVisit, setPurposesOfVisit] = useState<IPurposeOfVisit[]>(
    defaultPurposeOfVisit,
  );
  const navigation = useNavigation();

  const [selectedEatingMenus, setSelectedEatingMenus] = useState<Set<string>>(
    new Set(),
  );
  const [eatingMenus, setEatingMenus] =
    useState<IEatingMenu[]>(defaultEatingMenus);

  const nextButtonDisabled = () => {
    if (step === Step.PurposeOfVisit) {
      return purposesOfVisit.every(purpose => purpose.score === 0);
    }

    if (step === Step.Menu) {
      const eatMenus = eatingMenus.filter(menu => menu.score !== 0);
      return eatMenus.length !== selectedEatingMenus.size;
    }

    return false;
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
      <SafeAreaView
        style={{
          backgroundColor:
            step === Step.Feel || step === Step.StarRating
              ? 'white'
              : '#F6F6F6',
          flex: 1,
          position: 'relative',
        }}>
        <View
          style={{
            position: 'absolute',
            height: 200,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
        <StatusBar barStyle="dark-content" />
        {step === Step.Feel && (
          <FastImage
            source={feelingBackground}
            style={{
              width: 283,
              height: 233,
              position: 'absolute',
              bottom: 28,
              right: -20,
            }}
            resizeMode="contain"
          />
        )}
        <TopBackNavigation
          onPress={() => {
            if (step === 0) {
              navigation.goBack();
            }
            setStep(step - 1);
          }}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 80 }}>
          {/*<View*/}
          {/*  style={{*/}
          {/*    backgroundColor: 'white',*/}
          {/*    paddingTop: 12,*/}
          {/*    paddingHorizontal: 20,*/}
          {/*    flexDirection: 'row',*/}
          {/*    justifyContent: 'space-between',*/}
          {/*  }}>*/}
          {/*  <TouchableOpacity>*/}
          {/*    <FastImage source={backIcon} style={{ width: 21, height: 17 }} />*/}
          {/*  </TouchableOpacity>*/}
          {/*  <View style={{ flexDirection: 'row' }}>*/}
          {/*    <Text>{step + 1}</Text>*/}
          {/*    <Text>/5</Text>*/}
          {/*  </View>*/}
          {/*</View>*/}
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
          {step === Step.Feel && <Feeling />}
          {step === Step.StarRating && (
            <StarRating score={score} setScore={setScore} />
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
