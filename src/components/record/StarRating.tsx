import React, { Dispatch, SetStateAction } from 'react';
import { TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';

import { View, Text, TouchableOpacity } from '@/components';
import { starGray, starOrange } from '@/assets/images';

const ScoresInfo = [
  {
    value: 1,
    text: '화나요',
  },
  {
    value: 2,
    text: '별로예요',
  },
  {
    value: 3,
    text: '괜찮아요',
  },
  {
    value: 4,
    text: '만족해요',
  },
  {
    value: 5,
    text: '최고예요',
  },
];

const StarRating = ({
  score,
  setScore,
}: {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingBottom: 38,
        }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 23 }}>
          마지막 단계예요!{'\n'}방문한 카페에{'\n'}의견을 남겨주세요
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#f6f6f6',
          flexDirection: 'row',
          paddingTop: 35,
          paddingBottom: 35,
          paddingHorizontal: 42,
          justifyContent: 'space-between',
          marginHorizontal: 20,
          borderRadius: 10,
        }}>
        {ScoresInfo.map(scoreInfo => {
          return (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setScore(scoreInfo.value);
              }}>
              <FastImage
                source={scoreInfo.value <= score ? starOrange : starGray}
                style={{ width: 34, height: 32 }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: scoreInfo.value === score ? '#ff5c00' : '#999999',
                  marginTop: 12,
                }}>
                {scoreInfo.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TextInput
        multiline
        style={{ height: 130, width: '100%', borderWidth: 1 }}
        placeholder="자유롭게 적어주세요!"
      />
    </>
  );
};

export default StarRating;
