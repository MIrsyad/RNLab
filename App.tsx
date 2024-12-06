import React, { useEffect, useRef, useState } from 'react';
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
  Animated as Animat ,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
const _itemwidth = width* 0.7
const _itemheight = _itemwidth* 1.5
const _spacing = 20 
const _itemfullsize = _itemwidth + _spacing
const IMG_WIDTH = width * 0.75;
const IMG_HEIGHT = IMG_WIDTH * 1.45;

interface IData {
  title : string;
  content : string;
  image?: string;
}

interface ICard {
  index : number
  data : IData
  active : boolean
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

const Card = ( {data, active, index , handlePressItem,scrollx} : ICard) => {
  const widthAnimated = useSharedValue(_itemwidth);
  const heigthAnimated = useSharedValue(_itemheight);
  const [activetemp, setActivetemp] = useState(false)    

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{scale :interpolate(scrollx.value,[
        index-10, index , index +10
      ],[-0.8,1,0,8],Extrapolation.CLAMP)},{translateX :interpolate(activetemp? 1 : 0,[
        index-1, index , index +1
      ],[-5,1,5],Extrapolation.CLAMP)}]
    }
  })

  return (
    <TouchableOpacity onPress={() => {
      handlePressItem(index)
      widthAnimated.value = withSpring(activetemp == false ? width : _itemwidth);
      heigthAnimated.value = withSpring(activetemp == false ? height : _itemheight);
      setActivetemp(!activetemp)
      }}>
      <Animated.View style={[stylez,{
            width: widthAnimated,
            height: heigthAnimated,
            backgroundColor: 'white',
            borderRadius:8,
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
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollx.value = event.contentOffset.x / _itemfullsize
  })

  const [indexActive, setIndexActive] = useState<number | null>(null)


    const handlePressItem = (index: number) => {
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
          scrollEnabled={indexActive == null}

          renderItem={({item, index}) => {
            return (
            <View style={{alignItems: "center", marginHorizontal: indexActive == index ? 10 : 0}}> 
                <View style={{width: _itemwidth, borderRadius: 15, height: _itemheight, alignItems: "center", }}>
                  <Card scrollx={scrollx}  handlePressItem={handlePressItem}  index={index} active={indexActive == index} data={item}/>
                </View>
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
