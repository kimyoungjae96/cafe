import React from 'react';
import FastImage from 'react-native-fast-image';

import { Text, TouchableOpacity, View } from '@/components';
import { theme } from '@/infra';
import {
  score1Default,
  score1Selected,
  score2Default,
  score2Selected,
  score3Default,
  score3Selected,
  score4Default,
  score4Selected,
  score5Default,
  score5Selected,
} from '@/assets/images';

const FEELS = [
  { defaultIcon: score1Default, selectedIcon: score1Selected, text: '화나요' },
  {
    defaultIcon: score2Default,
    selectedIcon: score2Selected,
    text: '별로예요',
  },
  {
    defaultIcon: score3Default,
    selectedIcon: score3Selected,
    text: '괜찮아요',
  },
  {
    defaultIcon: score4Default,
    selectedIcon: score4Selected,
    text: '만족해요',
  },
  {
    defaultIcon: score5Default,
    selectedIcon: score5Selected,
    text: '최고예요',
  },
];

const QuestionWithScore = ({
  question,
  onClickScore,
  selectedScore,
}: {
  question: string;
  onClickScore: (score: number) => void;
  selectedScore: number;
}) => {
  return (
    <View
      style={{
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginTop: 38,
          marginBottom: 19,
        }}>
        {question}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {FEELS.map((feel, index) => {
          const score = index + 1;
          return (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  onClickScore(score);
                }}
                style={{
                  backgroundColor:
                    selectedScore === score
                      ? theme['color-primary-500']
                      : '#d3d3d3',
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={
                    selectedScore === score
                      ? feel.selectedIcon
                      : feel.defaultIcon
                  }
                  style={{ width: 22, height: 22 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 7,
                  color:
                    selectedScore === score
                      ? theme['color-primary-500']
                      : '#999999',
                  fontWeight: selectedScore === score ? '700' : '500',
                }}>
                {feel.text}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default QuestionWithScore;
