import React, { useState } from 'react';

import { View } from '@/components';
import { ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { BottomButton, PurposeOfVisit } from '@/components/record';
import { IPurposeOfVisit } from '@/models';

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

const Record = () => {
  const [selectedPurposes, setSelectedPurposes] = useState<Set<string>>(
    new Set(),
  );
  const [purposesOfVisit, setPurposesOfVisit] = useState<IPurposeOfVisit[]>(
    defaultPurposeOfVisit,
  );

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
          <PurposeOfVisit
            purposesOfVisit={purposesOfVisit}
            selectedPurposes={selectedPurposes}
            setPurposesOfVisit={setPurposesOfVisit}
            setSelectedPurposes={setSelectedPurposes}
          />
        </ScrollView>
        <BottomButton disabled={nextButtonDisabled()} onClickNext={() => {}} />
      </SafeAreaView>
    </>
  );
};

export default Record;
