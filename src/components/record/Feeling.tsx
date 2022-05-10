import React, { useState } from 'react';

import { Text, View } from '@/components';
import { TouchableOpacity } from '../common';
import { theme } from '@/infra';
import FastImage from 'react-native-fast-image';
import { feelingBackground } from '@/assets/images';

const Feels = [
  {
    id: 1,
    text: '아늑한',
    icon: '🛋',
    selected: false,
  },
  {
    id: 2,
    text: '조용한',
    icon: '📖',
    selected: false,
  },
  {
    id: 3,
    text: '감성적인',
    icon: '🍂',
    selected: false,
  },
  {
    id: 4,
    text: '이색적',
    icon: '🎁',
    selected: false,
  },
  {
    id: 5,
    text: '고급스러운',
    icon: '💎',
    selected: false,
  },
  {
    id: 6,
    text: '깔끔한',
    icon: '✨',
    selected: false,
  },
  {
    id: 7,
    text: '친절한',
    icon: '😄',
    selected: false,
  },
  {
    id: 8,
    text: '시끄러운',
    icon: '🔉',
    selected: false,
  },
  {
    id: 9,
    text: '평범한',
    icon: '☕',
    selected: false,
  },
  {
    id: 10,
    text: '천장이 높은',
    icon: '✈',
    selected: false,
  },
  {
    id: 11,
    text: '어두운',
    icon: '🔦',
    selected: false,
  },
  {
    id: 12,
    text: '밝은',
    icon: '🌟',
    selected: false,
  },
  {
    id: 13,
    text: '뷰가 좋은',
    icon: '🏞',
    selected: false,
  },
];

const Feeling = ({}: {}) => {
  const [feels, setFeels] = useState(Feels);

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingBottom: 38,
        }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 23 }}>
          방문한 카페에서 {'\n'}느낀 점들을 {'\n'}모두 선택해주세요
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 20,
        }}>
        {feels.map((feel, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                setFeels(prev => {
                  return prev.map(p => {
                    if (p.id === feel.id) {
                      return {
                        ...p,
                        selected: !p.selected,
                      };
                    }

                    return p;
                  });
                })
              }>
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: feel.selected
                    ? theme['color-primary-500']
                    : '#D3D3D3',
                  paddingHorizontal: 20,
                  paddingVertical: 11,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginHorizontal:
                    index === 1 || (index > 1 && (index + 1) % 3 === 2) ? 3 : 0,
                  marginBottom: 11,
                }}>
                <Text style={{ fontSize: 16, marginRight: 4 }}>
                  {feel.icon}
                </Text>
                <Text>{feel.text}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default Feeling;
