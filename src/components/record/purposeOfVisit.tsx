import { Text, View } from '@/components';
import FastImage from 'react-native-fast-image';
import { backIcon } from '@/assets/images';
import { Option, QuestionWithScore } from '@/components/record/index';
import React, { Dispatch, SetStateAction } from 'react';
import { IPurposeOfVisit } from '@/models';

const PurposeOfVisit = ({
  purposesOfVisit,
  selectedPurposes,
  setPurposesOfVisit,
  setSelectedPurposes,
}: {
  purposesOfVisit: IPurposeOfVisit[];
  selectedPurposes: Set<string>;
  setPurposesOfVisit: Dispatch<SetStateAction<IPurposeOfVisit[]>>;
  setSelectedPurposes: Dispatch<SetStateAction<Set<string>>>;
}) => {
  const getQuestions = (purposeKeys: string[]) =>
    purposeKeys.map(purposeKey =>
      purposesOfVisit.find(purpose => purpose.key === purposeKey),
    );

  const getScore = (key: string) =>
    purposesOfVisit.filter(purpose => purpose.key === key)[0].score;

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 12,
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
                  selectedPurposes.clear();
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
      {getQuestions([...selectedPurposes.values()].map((key: any) => key)).map(
        purpose => {
          if (!purpose) {
            return;
          }

          const { key, question } = purpose;
          return (
            <QuestionWithScore
              key={key}
              question={question}
              onClickScore={(score: number) => {
                setPurposesOfVisit(prev => {
                  return prev.map(p => {
                    if (p.key === key) {
                      return {
                        ...p,
                        score,
                      };
                    }

                    return p;
                  });
                });
              }}
              selectedScore={getScore(key)}
            />
          );
        },
      )}
    </>
  );
};

export default PurposeOfVisit;
