import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  DimensionValue,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Animated, { Extrapolation, interpolate, runOnJS, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
const _itemwidth = width* 0.6
const _itemheight = _itemwidth * 1.5
const _spacing = 8 
const _itemfullsize = _itemwidth + _spacing

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

export interface CardRenderProps {
  item: IData;
  scrollX?: SharedValue<number>;
  index?: number;
  itemWidth?: DimensionValue;
  marginHorizontal?: DimensionValue;
}

const Card = ( {data, expanded, currentIndex, indexActive, index , handlePressItem,scrollx} : ICard) => {
  const widthAnimated = useSharedValue(_itemwidth);
  const heigthAnimated = useSharedValue(_itemheight);
  const translateX = useSharedValue<number>(0);
  const [activetemp, setActivetemp] = useState(false)    

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{scale :interpolate(scrollx.value,[
        index-24, index , index +24
      ],[-0.8,1,0,8],Extrapolation.CLAMP)},{translateX :  withSpring(translateX.value * 0.5)}]
    }
  })

  useEffect(() => {    
    if (expanded != undefined) {
      if (index > currentIndex) {
          indexActive != null ? translateX.value += 120 : translateX.value -= 120
      }
      if (index < currentIndex) {
        indexActive != null ? translateX.value -= 120 : translateX.value += 120
      }
    }
  }, [expanded])
  
  return (
    <TouchableOpacity disabled={currentIndex != index} onPress={() => {
      handlePressItem(index)
      widthAnimated.value = withSpring(activetemp == false ? width : _itemwidth);
      heigthAnimated.value = withSpring(activetemp == false ? height : _itemheight);
      setActivetemp(!activetemp)
      }}>
      <Animated.View style={[stylez,{
            width: widthAnimated,
            height: heigthAnimated,
            backgroundColor: 'white',
            borderRadius: 15,
          }, styles.shadow]}>
        <Text style={{textAlign:'center'}}>{data.title}</Text>
        <Image width={60} height={60} source={{uri : data.image}}/>
        <Text style={{textAlign:'center'}} numberOfLines={7}>{data.content}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const scrollx = useSharedValue(0)
  const currentIndexShared = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setexpanded] = useState<boolean | undefined>(undefined)

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollx.value = event.contentOffset.x / _itemfullsize
// console.log('event',event.contentOffset.x);

    const index = Math.round(event.contentOffset.x / _itemfullsize);    
      if (index !== currentIndexShared.value) {
        currentIndexShared.value = index;
        runOnJS(setCurrentIndex)(index);
      }
  })

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

  const data : IData[] = [{title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
   ]

  return (
    <SafeAreaView style={[backgroundStyle, {flex:1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
     
      <View style={{flex:1}}>
        <Animated.FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{gap: _spacing, paddingHorizontal : (width - _itemwidth)/2}}
          snapToInterval={_itemfullsize}
          decelerationRate={'fast'}
          keyExtractor={(item,index) => item.title + index}
          onScroll={onScroll}
          scrollEnabled={expanded != true}
          renderItem={({item, index}) => {
            return (
              <View style={{width: _itemwidth, borderRadius: 15, height: _itemheight, alignItems: "center", }}>
                <Card expanded={expanded} currentIndex={currentIndex} scrollx={scrollx}  indexActive={indexActive}  handlePressItem={handlePressItem}  index={index} data={item}/>
              </View>
            )
          }}
        />
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow : {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default App;
