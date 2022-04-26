import React from 'react';

import { Text, TouchableOpacity, View } from '@/components';

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
        {['화나요', '별로예요', '괜찮아요', '만족해요', '최고예요'].map(
          (value, index) => {
            const score = index + 1;
            return (
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    onClickScore(score);
                  }}
                  style={{
                    backgroundColor: selectedScore === score ? 'blue' : 'red',
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                  }}
                />
                <Text style={{ marginTop: 7 }}>{value}</Text>
              </View>
            );
          },
        )}
      </View>
    </View>
  );
};

export default QuestionWithScore;
