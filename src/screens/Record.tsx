import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, SafeAreaView } from 'react-native';

import { View } from '@/components';
import {
  BottomButton,
  EatingMenu,
  Feeling,
  PurposeOfVisit,
} from '@/components/record';
import { IEatingMenu, IPurposeOfVisit } from '@/models';
import FastImage from 'react-native-fast-image';
import {
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
import { reviewApi } from '@/api/ReviewApi';
import { ScreenName } from '@/infra/route';

interface Feel {
  id: number;
  text: string;
  icon: string;
  selected: boolean;
}

enum Step {
  'PurposeOfVisit',
  'Menu',
  'Feel',
  'StarRating',
}

export const defaultPurposeOfVisit = [
  {
    key: 'STUDY',
    description: '공부',
    question: '공부하기 괜찮으셨나요?',
    score: 0,
    defaultImage: defaultStudy,
    selectedImage: selectedStudy,
  },
  {
    key: 'TALK',
    description: '대화',
    question: '대화하기 괜찮으셨나요?',
    score: 0,
    defaultImage: defaultConversation,
    selectedImage: selectedConversation,
  },
  {
    key: 'DATE',
    description: '데이트',
    question: '데이트하기 괜찮으셨나요?',
    score: 0,
    defaultImage: defaultDate,
    selectedImage: selectedDate,
  },
  {
    key: 'ETC',
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

const Record = ({ navigation }: { navigation: any }) => {
  const [step, setStep] = useState(Step.PurposeOfVisit);
  const [score, setScore] = useState(0);
  const [selectedPurposes, setSelectedPurposes] = useState<Set<string>>(
    new Set(),
  );
  const [purposesOfVisit, setPurposesOfVisit] = useState<IPurposeOfVisit[]>(
    defaultPurposeOfVisit,
  );
  const [selectedEatingMenus, setSelectedEatingMenus] = useState<Set<string>>(
    new Set(),
  );
  const [feels, setFeels] = useState<Feel[]>([]);
  const [eatingMenus, setEatingMenus] =
    useState<IEatingMenu[]>(defaultEatingMenus);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

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

  const write = async () => {
    const visitPurpose = purposesOfVisit.find(purposeOfVisit => {
      return purposeOfVisit.score !== 0;
    });

    if (!visitPurpose) {
      throw new Error('visit purpose is undefined');
    }

    const foodInfos = eatingMenus
      .filter(eatingMenu => eatingMenu.score !== 0)
      .map(eatingMenu => {
        return {
          food: eatingMenu.key,
          score: eatingMenu.score,
        };
      });

    const keywords = feels.filter(feel => feel.selected).map(feel => feel.id);

    try {
      await reviewApi.write({
        cafeId: 1,
        visitPurpose: visitPurpose.key,
        visitPurposeScore: visitPurpose.score,
        foodInfos,
        keywords,
        reviewImageIds: [],
        description,
        finalScore: score,
      });
    } catch (e) {
      console.log('에러');
    }
  };

  useEffect(() => {
    const init = async () => {
      const res = await reviewApi.getKeywords();
      setFeels(
        res.map((keyword, index) => {
          return {
            id: index,
            text: keyword.keyword,
            icon: keyword.emoji,
            selected: false,
          };
        }),
      );
    };
    init();
    return () => {};
  }, []);

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
          {step === Step.Feel && <Feeling feels={feels} setFeels={setFeels} />}
          {step === Step.StarRating && (
            <StarRating
              images={images}
              setImages={setImages}
              score={score}
              setScore={setScore}
              description={description}
              setDescription={setDescription}
            />
          )}
        </ScrollView>
        <BottomButton
          disabled={nextButtonDisabled()}
          onClickNext={async () => {
            if (step === Step.StarRating) {
              await write();
              navigation.navigate(ScreenName.MainTab);
              return;
            }

            setStep(prevStep => prevStep + 1);
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Record;
