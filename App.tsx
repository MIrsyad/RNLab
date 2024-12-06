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
  Animated,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { SharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
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
  translateX: any
  translateY: any
  scale: any
  active : boolean
  scaleAnim: Animated.Value;
  handlePressItem: (index : number) => void
}

export interface CardRenderProps {
  item: IData;
  scrollX?: SharedValue<number>;
  index?: number;
  itemWidth?: DimensionValue;
  marginHorizontal?: DimensionValue;
}

const Card = ( {data, active, translateX,translateY, scale, index, scaleAnim , handlePressItem} : ICard) => {
  const cardScaleX = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3], 
    extrapolate: 'clamp',
  });

  const cardScaleY = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5], 
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity onPress={() => {
      handlePressItem(index)
      }}>
      <Animated.View style={[{
            width: IMG_WIDTH,
            height: IMG_HEIGHT,
            transform: [{ translateX }, { translateY }, { scale }, { scaleX: cardScaleX }, { scaleY: cardScaleY }],
            backgroundColor: 'white',
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

  const [indexActive, setIndexActive] = useState<number | null>(null)

  const [scaleAnims, setScaleAnims] = useState<Animated.Value[]>([]); 

    const handlePressItem = (index: number) => {
    if (indexActive === index) {
      Animated.spring(scaleAnims[index], {
        toValue: 0, 
        friction: 3,
        tension: 150,
        useNativeDriver: true,
      }).start();
      setIndexActive(null); 
    } else {
      Animated.spring(scaleAnims[index], {
        toValue: 1, 
        friction: 3,
        tension: 150,
        useNativeDriver: true, 
      }).start();
      setIndexActive(index); 
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const data : IData[] = [{title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
    {title:'lorem ipsum', content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', image:'https://picsum.photos/200/300'},
   ]

  // Initialize scale animations for each card
  const initializeScaleAnims = () => {
    const scaleArray = data.map(() => new Animated.Value(0)); // One scale value per card
    setScaleAnims(scaleArray);
  };

    // Initialize the scale animations when the component mounts
    React.useEffect(() => {
      initializeScaleAnims();
    }, []);

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
        style={{flex:1}}
        contentContainerStyle={{paddingVertical:20}}
        keyExtractor={(item,index) => item.title + index}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]

          // Interpolate scale value
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8], // Scale down unfocused items
            extrapolate: 'clamp'
          });


          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * .3, 0, width * .3]
          })

          const translateY = scrollX.interpolate({
            inputRange ,
            outputRange: [0, 0, 0]
          })

          const scaleAnim = scaleAnims[index] || new Animated.Value(0);

          
          return (
          <View style={{width, justifyContent: "center", alignItems: "center", zIndex : index}}> 
              <View style={{width: IMG_WIDTH, borderRadius: 15, height: IMG_HEIGHT, alignItems: "center", }}>
                <Card  handlePressItem={handlePressItem}  scaleAnim={ scaleAnim} index={index} scale={scale} translateX={translateX} translateY={translateY} active={indexActive == index} data={item}/>
              </View>
          </View>
          )
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},)}
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
