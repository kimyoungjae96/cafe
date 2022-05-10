import React, { Dispatch, SetStateAction } from 'react';

import { Text, View } from '@/components';
import { Option, QuestionWithScore } from '@/components/record/index';
import { IPurposeOfVisit } from '@/models';
import { defaultPurposeOfVisit } from '@/screens/Record';

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
          paddingHorizontal: 20,
          paddingBottom: 38,
        }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 23 }}>
          방문하신 목적을{'\n'}선택해주세요
        </Text>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {purposesOfVisit.map(purposeOfVisit => {
            const { key } = purposeOfVisit;
            const selected = selectedPurposes.has(key);
            return (
              <Option
                key={key}
                text={purposeOfVisit.description}
                selected={selected}
                onClickOption={() => {
                  selectedPurposes.clear();
                  setPurposesOfVisit(defaultPurposeOfVisit);
                  setSelectedPurposes(prev => new Set(prev.add(key)));
                }}
                image={
                  selected
                    ? purposeOfVisit.selectedImage
                    : purposeOfVisit.defaultImage
                }
              />
            );
          })}
        </View>
      </View>
      {getQuestions([...selectedPurposes.values()].map((key: any) => key)).map(
        purpose => {
          const { key, question } = purpose!!;

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
