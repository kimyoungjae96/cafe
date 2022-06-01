import { SafeAreaView, ScrollView } from 'react-native';
import { View, Text } from '@/components';
import FastImage from 'react-native-fast-image';
import {
  heartIcon,
  logoIcon,
  messageIcon,
  notificationIcon,
  searchIcon,
  starIcon,
} from '@/assets/images';
import * as React from 'react';
import { theme, WINDOW_WIDTH } from '@/infra';

const FeedScreen = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 54,
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderColor: '#E7E7E7',
            borderBottomWidth: 1,
          }}>
          <FastImage
            source={logoIcon}
            style={{ width: 56, height: 18 }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row' }}>
            <FastImage
              source={notificationIcon}
              style={{ width: 24, height: 24, marginRight: 20 }}
              resizeMode="contain"
            />
            <FastImage
              source={searchIcon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </View>
        </View>
        <ScrollView>
          <Post />
          <Post />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Post = () => {
  return (
    <View style={{ backgroundColor: 'white', marginBottom: 6 }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 17, fontWeight: '700' }}>카페 알베르</Text>
        <Text style={{ fontWeight: '500' }}>유저닉네임</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          alignItems: 'center',
          paddingHorizontal: 18,
        }}>
        <FastImage
          source={starIcon}
          style={{ width: 16, height: 16 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: '500', fontSize: 13, marginLeft: 2 }}>
          4.5
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 13, marginLeft: 4 }}>
          ·
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#999999',
            textDecorationLine: 'underline',
          }}>
          서울 강남구
        </Text>
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
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 22,
          flexDirection: 'row',
        }}>
        <Tag />
        <Tag />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          backgroundColor: '#efefef',
          height: 1,
          marginBottom: 17,
        }}
      />
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
    </View>
  );
};

const Tag = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 79,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 6,
        backgroundColor: '#FFF5EF',
        borderRadius: 50,
        alignItems: 'center',
      }}>
      <Text>📖</Text>
      <Text
        style={{
          fontWeight: '500',
          color: theme['color-primary-500'],
          marginLeft: 6,
        }}>
        태그
      </Text>
    </View>
  );
};

export default FeedScreen;
