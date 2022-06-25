import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Text, TouchableOpacity, View } from '@/components';
import { theme } from '@/infra';
import FastImage from 'react-native-fast-image';
import { backIcon, searchIcon } from '@/assets/images';
import NaverMapView, { Marker } from 'react-native-nmap';
import { NormalMapPin } from '@/components/searchResult/NormalMapPin';
import { SelectedMapPin } from '@/components/searchResult/SelectedMapPin';

const SearchResult = ({ navigation }: { navigation: any }) => {
  const [keyword, setKeyword] = useState('');
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const P1 = { latitude: 37.565051, longitude: 126.978567 };
  const P2 = { latitude: 37.565383, longitude: 126.976292 };

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
          <FastImage
            source={searchIcon}
            style={{ width: 24, height: 24, right: 20, position: 'absolute' }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 52 }}>
          <NaverMapView
            style={{ width: '100%', height: '100%' }}
            showsMyLocationButton={true}
            center={{ ...P0, zoom: 16 }}
            onCameraChange={e =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            <NormalMapPin name={'1'} location={P0} />
            <SelectedMapPin name={'2'} location={P1} />
          </NaverMapView>
        </View>
        <View style={{ flex: 48 }}>
          <View
            style={{
              height: 42,
              borderBottomWidth: 1,
              borderColor: '#e7e7e7',
            }}>
            <Text
              style={{
                fontWeight: '500',
                marginVertical: 12,
                marginLeft: 20,
              }}>
              검색 결과
            </Text>
          </View>
          <SearchResultItem isSelected />
          <SearchResultItem isSelected={false} />
          <SearchResultItem isSelected={false} />
          <SearchResultItem isSelected={false} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SearchResultItem = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#efefef',
        borderBottomWidth: 1,
        marginHorizontal: 20,
      }}>
      <View
        style={{
          height: 80,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: isSelected ? '700' : '500',
            fontSize: 16,
          }}>
          스타벅스강남삼성타운점
        </Text>
        <Text style={{ color: '#999999', fontSize: 13, marginTop: 5 }}>
          서울특별시 중구 세종대로 124 스타벅스
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: isSelected ? theme['color-primary-500'] : 'white',
          borderColor: theme['color-primary-500'],
          borderWidth: 1,
          borderRadius: 6,
        }}>
        <Text
          style={{
            color: isSelected ? 'white' : theme['color-primary-500'],
          }}>
          선택
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchResult;
