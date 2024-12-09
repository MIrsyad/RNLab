import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Animated, { runOnJS, SharedValue, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { _itemfullsize, _itemheight, _itemwidth, _spacing, data, width } from '../assets/constant';
import Card from '../components/movieCard';

interface IData {
  title : string;
  content : string;
  image?: string;
}

interface ICard {
  index : number
  indexActive : number | null
  data : IData
  expanded: boolean | undefined
  currentIndex : number
  scrollx : SharedValue<number>
  handlePressItem: (index : number) => void
}

function HomeScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollx = useSharedValue(0)
  const currentIndexShared = useSharedValue(0);
//   current index of focused card
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setexpanded] = useState<boolean | undefined>(undefined)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
        // sett scrollx value divided by card item fullsize : width + padding
      scrollx.value = event.contentOffset.x / _itemfullsize;
      //getting current index of the card by dividing the contentoffset divided by its card item full size
      const index = Math.round(event.contentOffset.x / _itemfullsize);    
      if (index !== currentIndexShared.value) {
        currentIndexShared.value = index;
        runOnJS(setCurrentIndex)(index);
      }
    },
  });

//   to determine which index is expanded/active card
  const [indexActive, setIndexActive] = useState<number | null>(null)


    const handlePressItem = (index: number) => {
      setexpanded(expanded == true ? false : true)
    if (indexActive === index) {
      setIndexActive(null); 
    } else {
     
      setIndexActive(index); 
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <GestureHandlerRootView>
        <SafeAreaView style={[backgroundStyle, {flex:1}]}>
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
            <Animated.FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={{gap: _spacing, paddingHorizontal : (width - _itemwidth)/2}}
            snapToInterval={_itemfullsize}
            decelerationRate={'fast'}
            keyExtractor={(item,index) => item.title + index}
            onScroll={scrollHandler}
            scrollEnabled={expanded != true}
            renderItem={({item, index}) => {
                return (
                <View style={{width: _itemwidth, borderRadius: 15, height: _itemheight, alignItems: "center", }}>
                    <Card expanded={expanded} currentIndex={currentIndex} scrollx={scrollx}  indexActive={indexActive}  handlePressItem={handlePressItem}  index={index} data={item}/>
                </View>
                )
            }}
            />
        </SafeAreaView>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  
});

export default HomeScreen;
