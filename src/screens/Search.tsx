import React, { useState } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity, View, Text, Dot } from '@/components';
import FastImage from 'react-native-fast-image';
import { backIcon, gpsIcon, searchIcon } from '@/assets/images';
import { theme } from '@/infra';
import { ScreenName } from '@/infra/route';

const Search = ({ navigation }: { navigation: any }) => {
  const [keyword, setKeyword] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 55,
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: theme['color-primary-500'],
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginHorizontal: 20 }}>
            <FastImage source={backIcon} style={{ width: 21, height: 17 }} />
          </TouchableOpacity>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="카페를 검색해주세요"
          />
          <TouchableOpacity
            style={{ right: 20, position: 'absolute' }}
            onPress={() => {
              navigation.navigate(ScreenName.SearchResult);
            }}>
            <FastImage
              source={searchIcon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 55,
            borderBottomWidth: 6,
            borderColor: '#F4F3F2',
          }}>
          <FastImage
            source={gpsIcon}
            style={{ width: 16, height: 16, marginRight: 5 }}
          />
          <Text
            style={{ color: theme['color-primary-500'], fontWeight: '500' }}>
            강남구 봉은사로 58길
          </Text>
        </View>
        <View
          style={{ paddingHorizontal: 20, paddingTop: 32, paddingBottom: 20 }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              marginLeft: 1,
              marginBottom: 20,
            }}>
            리뷰 남기고 싶은 카페를 검색해보세요.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3,
            }}>
            <Dot
              backgroundColor={'black'}
              width={3}
              height={3}
              borderRadius={3}
            />
            <Text style={{ fontWeight: '500', marginLeft: 6, marginBottom: 3 }}>
              가게명
            </Text>
          </View>
          <Text style={{ color: '#999999', marginBottom: 15, marginLeft: 8 }}>
            예: 스타벅스, 맥도날드
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3,
            }}>
            <Dot
              backgroundColor={'black'}
              width={3}
              height={3}
              borderRadius={3}
            />
            <Text style={{ fontWeight: '500', marginLeft: 6, marginBottom: 3 }}>
              지역명
            </Text>
          </View>
          <Text style={{ color: '#999999', marginBottom: 15, marginLeft: 8 }}>
            예: 송파구, 종로구
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Dot
              backgroundColor={'black'}
              width={3}
              height={3}
              borderRadius={3}
            />
            <Text style={{ fontWeight: '500', marginLeft: 6, marginBottom: 3 }}>
              가게명
            </Text>
          </View>
          <Text style={{ color: '#999999', marginLeft: 8 }}>
            예: 강남대로 159, 송파구 155
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
