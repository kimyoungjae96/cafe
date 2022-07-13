import React from 'react';
import SearchBar from '@/components/common/SearchBar';
import {
  backWhiteIcon,
  dibsIcon,
  mapIcon,
  shareIcon,
  starIcon,
} from '@/assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '@/components';
import FastImage from 'react-native-fast-image';

const CafeDetail = () => {
  return (
    <SafeAreaView>
      <SearchBar image={backWhiteIcon} backgroundColor="transparent" />
      <View style={{ height: 375, backgroundColor: 'black' }} />

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>카페 알베르</Text>
        <View style={{ flexDirection: 'row' }}>
          <FastImage
            source={starIcon}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          />
          <Text style={{ fontWeight: '600', fontSize: 13 }}> 4.5</Text>
          <Text style={{ fontWeight: '600', fontSize: 13 }}>(135)</Text>
        </View>
      </View>

      <CafeActionButtons />
    </SafeAreaView>
  );
};

const CafeActionButtons = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
      }}>
      <View>
        <FastImage source={mapIcon} style={{ width: 24, height: 24 }} />
        <Text style={{ marginTop: 8 }}>지도</Text>
      </View>
      <View>
        <FastImage source={shareIcon} style={{ width: 24, height: 24 }} />
        <Text style={{ marginTop: 8 }}>공유</Text>
      </View>
      <View>
        <FastImage source={dibsIcon} style={{ width: 24, height: 24 }} />
        <Text style={{ marginTop: 8 }}>ZIP</Text>
      </View>
    </View>
  );
};

export default CafeDetail;
