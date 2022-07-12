import FastImage, { Source } from 'react-native-fast-image';
import { logoIcon, notificationIcon, searchIcon } from '@/assets/images';
import { TouchableOpacity, View } from '@/components';
import { ScreenName } from '@/infra/route';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({
  image,
  backgroundColor,
}: {
  image: Source;
  backgroundColor: string;
}) => {
  // TODO: remove any
  const navigation: any = useNavigation();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 54,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor,
        borderColor: '#E7E7E7',
        borderBottomWidth: 1,
      }}>
      <FastImage
        source={image}
        style={{ width: 56, height: 18 }}
        resizeMode="contain"
      />
      <View style={{ flexDirection: 'row' }}>
        <FastImage
          source={notificationIcon}
          style={{ width: 24, height: 24, marginRight: 20 }}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenName.Search);
          }}>
          <FastImage
            source={searchIcon}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
