import React, { useState } from 'react';

import FastImage from 'react-native-fast-image';

import { locationIcon, backIcon } from '@/assets/images';
import { Text, View, TouchableOpacity } from '@/components';
import { theme, WINDOW_WIDTH } from '@/infra';
import { ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { BottomButton, Option, QuestionWithScore } from '@/components/record';

enum Step {
  'PurposeOfVisit',
  'Menu',
  'Feel',
  'Review',
  'Score',
}

const Record = () => {
  const [selectedPurposes, setSelectedPurposes] = useState(new Set());
  const [purposesOfVisit, setPurposesOfVisit] = useState([
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
  ]);

  const getQuestions = (purposeKeys: string[]) => {
    return purposesOfVisit.filter(purpose => purposeKeys.includes(purpose.key));
  };

  const getScore = (key: string) => {
    return purposesOfVisit.filter(purpose => purpose.key === key)[0].score;
  };

  const nextButtonDisabled = () => {
    return purposesOfVisit.every(purpose => purpose.score === 0);
  };

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
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FastImage source={backIcon} style={{ width: 21, height: 17 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text>1</Text>
              <Text>/5</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingBottom: 38,
            }}>
            <View style={{ flexDirection: 'row', marginTop: 48 }}>
              <FastImage
                source={locationIcon}
                style={{ width: 16, height: 18 }}
              />
              <Text
                style={{
                  color: theme['color-primary-500'],
                  marginLeft: 4,
                  textDecorationLine: 'underline',
                }}>
                스타벅스 파르나스점
              </Text>
            </View>
            <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 23 }}>
              방문하신 목적을{'\n'}선택해주세요
            </Text>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {purposesOfVisit.map(purposeOfVisit => {
                const key = purposeOfVisit.key;
                const selected = selectedPurposes.has(key);
                return (
                  <Option
                    text={purposeOfVisit.description}
                    selected={selected}
                    onClickOption={() => {
                      if (selectedPurposes.has(key)) {
                        setPurposesOfVisit(prev => {
                          return prev.map(p => {
                            if (p.key === key) {
                              return {
                                ...p,
                                score: 0,
                              };
                            }

                            return p;
                          });
                        });
                        setSelectedPurposes(
                          prev => new Set([...prev].filter(x => x !== key)),
                        );
                      } else {
                        setSelectedPurposes(prev => new Set(prev.add(key)));
                      }
                    }}
                  />
                );
              })}
            </View>
          </View>
          {getQuestions(
            [...selectedPurposes.values()].map((key: any) => key),
          ).map(purpose => {
            const question = purpose.question;
            return (
              <QuestionWithScore
                question={question}
                onClickScore={(score: number) => {
                  setPurposesOfVisit(prev => {
                    return prev.map(p => {
                      if (p.key === purpose.key) {
                        return {
                          ...p,
                          score,
                        };
                      }

                      return p;
                    });
                  });
                }}
                selectedScore={getScore(purpose.key)}
              />
            );
          })}
        </ScrollView>
        <BottomButton disabled={nextButtonDisabled()} onClickNext={() => {}} />
      </SafeAreaView>
    </>
  );
};

export default Record;
