import React, { useState } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity, View } from '@/components';
import { theme } from '@/infra';
import FastImage from 'react-native-fast-image';
import { backIcon, searchIcon } from '@/assets/images';
import NaverMapView, { Marker } from 'react-native-nmap';

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
            <Marker
              coordinate={P0}
              onClick={() => console.warn('onClick! p0')}
            />
            <Marker
              coordinate={P1}
              pinColor="blue"
              onClick={() => console.warn('onClick! p1')}
            />
            <Marker
              coordinate={P2}
              pinColor="red"
              onClick={() => console.warn('onClick! p2')}
            />
          </NaverMapView>
        </View>
        <View style={{ flex: 48 }}></View>
      </View>
    </SafeAreaView>
  );
};

export default SearchResult;
