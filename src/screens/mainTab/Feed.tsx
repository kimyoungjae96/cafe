import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from '@/components';
import FastImage from 'react-native-fast-image';
import { heartIcon, logoIcon, messageIcon, starIcon } from '@/assets/images';
import * as React from 'react';
import { theme, WINDOW_WIDTH } from '@/infra';
import { ScreenName } from '@/infra/route';
import { useEffect } from 'react';
import { usePermissionStore } from '@/stores';
import SearchBar from '@/components/common/SearchBar';
import { useNavigation } from '@react-navigation/native';

const FeedScreen = () => {
  const r = usePermissionStore();
  useEffect(() => {
    r.requestGeolocationPermission();
    return () => {};
  }, [r]);

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar backgroundColor="white" image={logoIcon} />
        <ScrollView>
          <Post />
          <Post />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Post = () => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenName.CafeDetail);
      }}
      style={{ backgroundColor: 'white', marginBottom: 6 }}>
      <View style={styles.cafeNameAndUserNameWrapper}>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>카페 알베르</Text>
        <Text style={{ fontSize: 12, fontWeight: '500' }}>유저닉네임</Text>
      </View>
      <View style={styles.locationAndScoreWrapper}>
        <FastImage
          source={starIcon}
          style={{ width: 16, height: 16 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: '500', fontSize: 13, marginLeft: 2 }}>
          4.5
        </Text>
        <Text style={styles.locationDot}>·</Text>
        <Text style={styles.locationText}>서울 강남구</Text>
      </View>
      <View
        style={{
          width: WINDOW_WIDTH - 36,
          height: 200,
          backgroundColor: 'skyblue',
          alignSelf: 'center',
          marginTop: 18,
          borderRadius: 8,
        }}
      />
      <Text style={{ marginTop: 20, paddingHorizontal: 20 }}>
        커피가 넘 맛있어요~ 분위기도 최고!!
      </Text>
      <View style={styles.tagContainer}>
        <Tag />
        <Tag />
      </View>
      <View style={styles.divider} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            source={heartIcon}
            style={{ width: 16, height: 13 }}
            resizeMode="contain"
          />
          <Text style={{ marginLeft: 6, fontSize: 13, fontWeight: '500' }}>
            16
          </Text>
          <FastImage
            source={messageIcon}
            style={{ width: 15, height: 14, marginLeft: 10 }}
            resizeMode="contain"
          />
          <Text style={{ marginLeft: 6, fontSize: 13, fontWeight: '500' }}>
            16
          </Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#999999' }}>
          16시간 전
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Tag = () => {
  return (
    <View style={styles.tagWrapper}>
      <Text>📖</Text>
      <Text style={styles.tagText}>태그</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cafeNameAndUserNameWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tagContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 22,
    flexDirection: 'row',
  },
  tagWrapper: {
    flexDirection: 'row',
    width: 79,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 6,
    backgroundColor: '#FFF5EF',
    borderRadius: 50,
    alignItems: 'center',
  },
  tagText: {
    fontWeight: '500',
    color: theme['color-primary-500'],
    marginLeft: 6,
  },
  divider: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#efefef',
    height: 1,
    marginBottom: 17,
  },
  locationAndScoreWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  locationDot: {
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 4,
    color: '#999999',
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
    textDecorationLine: 'underline',
  },
});

export default FeedScreen;
