import React from 'react';

import { Text, View } from '@/components';
import { TouchableOpacity } from '../common';
import { theme } from '@/infra';

const Feeling = ({ feels, setFeels }: { feels: any; setFeels: any }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingBottom: 38,
        }}>
        <View
          style={{ marginTop: 23, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>느낀 점</Text>
          <Text style={{ fontSize: 28 }}>들을</Text>
        </View>
        <Text style={{ fontSize: 28 }}>모두 선택해주세요</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 20,
        }}>
        {feels.map((feel: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() =>
                setFeels((prev: any) => {
                  return prev.map((p: any) => {
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
                  paddingHorizontal: 16,
                  paddingVertical: 11,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginHorizontal:
                    index === 1 || (index > 1 && (index + 1) % 3 === 2) ? 3 : 0,
                  marginBottom: 11,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginRight: 4,
                  }}>
                  {feel.icon}
                </Text>
                <Text
                  style={{
                    fontWeight: feel.selected ? '700' : '500',
                    color: feel.selected ? theme['color-primary-500'] : '#999',
                  }}>
                  {feel.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default Feeling;
