import React, { Dispatch, SetStateAction } from 'react';

import { Text, View } from '@/components';
import { Option, QuestionWithScore } from '@/components/record/index';
import { IEatingMenu } from '@/models';

const EatingMenu = ({
  eatingMenus,
  selectedEatingMenus,
  setEatingMenus,
  setSelectedEatingMenus,
}: {
  eatingMenus: IEatingMenu[];
  selectedEatingMenus: Set<string>;
  setEatingMenus: Dispatch<SetStateAction<IEatingMenu[]>>;
  setSelectedEatingMenus: Dispatch<SetStateAction<Set<string>>>;
}) => {
  const getMenus = (purposeKeys: string[]) =>
    purposeKeys.map(purposeKey =>
      eatingMenus.find(purpose => purpose.key === purposeKey),
    );

  const getScore = (key: string) =>
    eatingMenus.filter(purpose => purpose.key === key)[0].score;

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingBottom: 38,
        }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 23 }}>
          드신 메뉴들을{'\n'}모두 선택해주세요
        </Text>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {eatingMenus.map(purposeOfVisit => {
            const key = purposeOfVisit.key;
            const selected = selectedEatingMenus.has(key);
            return (
              <Option
                text={purposeOfVisit.description}
                selected={selected}
                onClickOption={() => {
                  if (selectedEatingMenus.has(key)) {
                    setEatingMenus(prev => {
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
                    setSelectedEatingMenus(
                      prev => new Set([...prev].filter(x => x !== key)),
                    );
                  } else {
                    setSelectedEatingMenus(prev => new Set(prev.add(key)));
                  }
                }}
              />
            );
          })}
        </View>
      </View>
      {getMenus([...selectedEatingMenus.values()].map((key: any) => key)).map(
        menu => {
          if (!menu) {
            return;
          }

          const { key, question } = menu;
          return (
            <QuestionWithScore
              key={key}
              question={question}
              onClickScore={(score: number) => {
                setEatingMenus(prev => {
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

export default EatingMenu;