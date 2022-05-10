import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';

import { View, Text, TouchableOpacity } from '@/components';
import { plus, starGray, starOrange } from '@/assets/images';

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
  const [isFocused, setIsFocused] = useState(false);
  const [response, setResponse] = React.useState<any>([]);

  return (
    <View style={{ paddingHorizontal: 20, backgroundColor: 'white' }}>
      <View
        style={{
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
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        style={{
          height: 130,
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingTop: 17,
          borderColor: isFocused ? 'black' : '#d3d3d3',
        }}
        placeholder="자유롭게 적어주세요!"
      />
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          사진을 추가해주세요
        </Text>
        <Text style={{ color: '#999', marginLeft: 4, marginTop: 1 }}>
          (선택)
        </Text>
      </View>
      <View style={{ marginTop: 16, flexDirection: 'row' }}>
        <View
          style={{
            width: 65,
            height: 65,
            borderRadius: 8,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              ImagePicker.launchImageLibrary(
                {
                  maxHeight: 200,
                  maxWidth: 200,
                  selectionLimit: 0,
                  mediaType: 'photo',
                  includeBase64: false,
                  includeExtra: true,
                },
                res => {
                  setResponse((prev: any) => {
                    if (res.assets) {
                      console.log(res.assets);
                      return [...prev, ...res.assets];
                    }
                    return [];
                  });
                },
              );
            }}>
            <FastImage
              source={plus}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {response.map((asset: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setResponse((prev: any) => {
                  return [
                    ...prev.filter((_: any, idx: number) => {
                      return index !== idx;
                    }),
                  ];
                });
              }}
              style={{
                width: 65,
                height: 65,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}>
              <FastImage
                source={{ uri: asset.uri }}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 8,
                  position: 'absolute',
                  backgroundColor: 'blue',
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  width: 65,
                  height: 65,
                  borderRadius: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              />
              <FastImage
                source={plus}
                style={{
                  width: 20,
                  height: 20,
                  transform: [{ rotate: '45deg' }],
                }}
                resizeMode="contain"
              />
              <Text style={{ marginTop: 6, color: 'white', fontSize: 12 }}>
                삭제
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StarRating;
