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
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Divider from '@/components/common/Divider';

const CafeDetail = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '정보' },
    { key: 'second', title: '리뷰' },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
      <Divider />
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{
                backgroundColor: 'white',
                shadowOpacity: undefined,
                elevation: undefined,
              }}
              contentContainerStyle={{
                borderBottomWidth: 1,
                borderColor: '#E7E7E7',
              }}
              indicatorStyle={{ backgroundColor: 'black' }}
              renderLabel={({ route, focused }) => (
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: focused ? '700' : '500',
                  }}>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const FirstRoute = () => (
  <View style={{ width: '100%', height: 400, backgroundColor: 'white' }}>
    <Text>정보</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ width: '100%', height: 400, backgroundColor: 'white' }}>
    <Text>리뷰</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const CafeActionButtons = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
        marginBottom: 33,
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
