import React, { useEffect, useState } from 'react';
import {
  Dimensions,
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
import Animated, { Extrapolation, interpolate, runOnJS, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withClamp, withSpring, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');
const _itemwidth = width* 0.6
const _itemheight = 300
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

const Card = ( {data, expanded, currentIndex, indexActive, index , handlePressItem,scrollx} : ICard) => {
  const widthAnimated = useSharedValue(_itemwidth );
  const heigthAnimated = useSharedValue(_itemheight );
  const IwidthAnimated = useSharedValue(_itemwidth );
  const IheigthAnimated = useSharedValue(100);
  const translateX = useSharedValue<number>(0);
  const [activetemp, setActivetemp] = useState(false)    

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{scale :interpolate(scrollx.value,[
        index-24, index , index +24
      ],[-0.8,1,0,8],Extrapolation.CLAMP)},{translateX :  withSpring(translateX.value * 0.5)}],
      width:widthAnimated.get(),
      height: heigthAnimated.get(),
    }
  })

  const styleImage = useAnimatedStyle(() => {
    return {
      width:IwidthAnimated.get(),
      height: IheigthAnimated.get(),
    }
  })

  const handlePress = () =>{
    handlePressItem(index)
    setActivetemp(!activetemp)
    }

  useEffect(() => {    
    if (expanded != undefined) {
      if (index > currentIndex) {
          indexActive != null ? translateX.value += 125 : translateX.value -= 125
      }
      if (index < currentIndex) {
        indexActive != null ? translateX.value -= 125 : translateX.value += 125
      }
    }
  }, [expanded])
  
  useEffect(() => {
    widthAnimated.value = withSpring(activetemp == true ? width: _itemwidth);
    heigthAnimated.value = withSpring(activetemp == true ? height - 20 : _itemheight);
    IheigthAnimated.value = withSpring(activetemp == true ? _itemwidth : 100);
    IwidthAnimated.value = withSpring(activetemp == true ? width : _itemwidth);
  }, [activetemp])
  
  return (
    <TouchableOpacity disabled={currentIndex != index || expanded} onPress={handlePress}>
        <Animated.View style={[stylez,{
              backgroundColor: 'white',
              borderRadius: 15,
            }, styles.shadow]}>
          <View style={{padding : 4, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            {expanded && 
             <TouchableOpacity  style={{position:'absolute', top:4, left:4,zIndex:1000}} onPress={handlePress}>
             <Text>Close</Text>
           </TouchableOpacity>
            }
            <Text style={{textAlign:'center',flex:1}}>{data.title}</Text>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Animated.Image style={styleImage} source={{uri : data.image}}/>
            <Text style={{textAlign:'justify',padding:8}} numberOfLines={!activetemp? 7 : undefined}>{data.content}</Text>
          </ScrollView >
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollx.value = event.contentOffset.x / _itemfullsize;
      const index = Math.round(event.contentOffset.x / _itemfullsize);    
      if (index !== currentIndexShared.value) {
        currentIndexShared.value = index;
        runOnJS(setCurrentIndex)(index);
      }
    },
  });

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

  const data : IData[] = [{title:'lorem ipsum', content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur nisl metus. Ut auctor dui ante, a hendrerit augue interdum a. Praesent non tempor arcu. Curabitur et viverra nunc. Quisque interdum est non nisi lobortis, id rhoncus eros molestie. Integer mollis mauris nunc, condimentum ultricies nibh dictum sed. Morbi aliquet semper lectus sit amet porta.

Mauris nec elementum justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ornare, purus vel iaculis aliquam, tellus magna vehicula urna, id volutpat diam odio sit amet nulla. Vivamus semper facilisis nunc. Curabitur lobortis eros a lobortis malesuada. Vestibulum orci magna, sagittis sed nisl ut, egestas tincidunt ligula. Sed tincidunt quam sed justo gravida fermentum. Ut at est id nibh varius laoreet vitae eget odio. Aliquam facilisis mollis varius. Sed ut risus lobortis, posuere erat tincidunt, pulvinar nibh. Mauris ac turpis lobortis, pellentesque ante quis, rutrum neque. Aenean eu sagittis felis. Nunc fringilla sit amet odio eu tristique.

Pellentesque accumsan eros in tincidunt tincidunt. Maecenas mattis ante id enim egestas, vitae lacinia leo iaculis. Suspendisse potenti. Sed lobortis vulputate pharetra. Aliquam erat volutpat. Nam congue faucibus neque, vel laoreet nulla varius sit amet. Duis interdum lacus dui, sagittis luctus magna sagittis quis. Morbi in sagittis quam. Pellentesque ex leo, malesuada id augue vitae, tempus consequat eros. Aliquam eget nibh quis velit tristique tempus sit amet hendrerit augue. Duis maximus dui sit amet eros vehicula sollicitudin. Nam sit amet sodales metus, ut pharetra justo.

Nam sagittis vel mauris a sodales. Nulla nec tempor turpis. Nunc tempus scelerisque est. Cras varius dui ut metus iaculis iaculis. Pellentesque non iaculis leo, et eleifend odio. Aenean tristique consequat felis, quis vehicula lacus lobortis in. Aliquam hendrerit, libero malesuada ornare maximus, ex nibh hendrerit metus, ut volutpat lacus mauris ac lacus. Aenean condimentum id velit sit amet consectetur. Suspendisse a finibus neque, vitae accumsan ipsum. Sed sed leo magna. Vestibulum elementum luctus sapien sit amet interdum. Suspendisse eget risus non ex egestas laoreet.

Duis faucibus, magna sit amet consequat dignissim, purus odio gravida sapien, et finibus odio diam porta massa. Etiam non velit et risus maximus bibendum. Mauris dignissim lacinia porttitor. Ut vitae est sit amet libero ullamcorper consequat. Proin sit amet finibus lectus. Aenean et mollis purus. Suspendisse varius nisi eu est ultrices, eget ultrices augue hendrerit. Ut luctus lorem metus, nec gravida eros dapibus vel. Aliquam pulvinar justo non tellus interdum, vitae dictum ligula auctor. Aliquam suscipit est non enim auctor, eu malesuada nulla pharetra. Pellentesque ut turpis sit amet lorem rhoncus faucibus sed facilisis ante.`, image:'https://i.pinimg.com/originals/2f/b2/41/2fb241498d55157668ca09f6175a9636.jpg'},
    {title:'lorem ipsum', content:'Lorem Ipsum ', image:'https://i.pinimg.com/originals/2f/b2/41/2fb241498d55157668ca09f6175a9636.jpg'},
    {title:'lorem ipsum', content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur nisl metus. Ut auctor dui ante, a hendrerit augue interdum a. Praesent non tempor arcu. Curabitur et viverra nunc. Quisque interdum est non nisi lobortis, id rhoncus eros molestie. Integer mollis mauris nunc, condimentum ultricies nibh dictum sed. Morbi aliquet semper lectus sit amet porta.

Mauris nec elementum justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ornare, purus vel iaculis aliquam, tellus magna vehicula urna, id volutpat diam odio sit amet nulla. Vivamus semper facilisis nunc. Curabitur lobortis eros a lobortis malesuada. Vestibulum orci magna, sagittis sed nisl ut, egestas tincidunt ligula. Sed tincidunt quam sed justo gravida fermentum. Ut at est id nibh varius laoreet vitae eget odio. Aliquam facilisis mollis varius. Sed ut risus lobortis, posuere erat tincidunt, pulvinar nibh. Mauris ac turpis lobortis, pellentesque ante quis, rutrum neque. Aenean eu sagittis felis. Nunc fringilla sit amet odio eu tristique.

Pellentesque accumsan eros in tincidunt tincidunt. Maecenas mattis ante id enim egestas, vitae lacinia leo iaculis. Suspendisse potenti. Sed lobortis vulputate pharetra. Aliquam erat volutpat. Nam congue faucibus neque, vel laoreet nulla varius sit amet. Duis interdum lacus dui, sagittis luctus magna sagittis quis. Morbi in sagittis quam. Pellentesque ex leo, malesuada id augue vitae, tempus consequat eros. Aliquam eget nibh quis velit tristique tempus sit amet hendrerit augue. Duis maximus dui sit amet eros vehicula sollicitudin. Nam sit amet sodales metus, ut pharetra justo.

Nam sagittis vel mauris a sodales. Nulla nec tempor turpis. Nunc tempus scelerisque est. Cras varius dui ut metus iaculis iaculis. Pellentesque non iaculis leo, et eleifend odio. Aenean tristique consequat felis, quis vehicula lacus lobortis in. Aliquam hendrerit, libero malesuada ornare maximus, ex nibh hendrerit metus, ut volutpat lacus mauris ac lacus. Aenean condimentum id velit sit amet consectetur. Suspendisse a finibus neque, vitae accumsan ipsum. Sed sed leo magna. Vestibulum elementum luctus sapien sit amet interdum. Suspendisse eget risus non ex egestas laoreet.

Duis faucibus, magna sit amet consequat dignissim, purus odio gravida sapien, et finibus odio diam porta massa. Etiam non velit et risus maximus bibendum. Mauris dignissim lacinia porttitor. Ut vitae est sit amet libero ullamcorper consequat. Proin sit amet finibus lectus. Aenean et mollis purus. Suspendisse varius nisi eu est ultrices, eget ultrices augue hendrerit. Ut luctus lorem metus, nec gravida eros dapibus vel. Aliquam pulvinar justo non tellus interdum, vitae dictum ligula auctor. Aliquam suscipit est non enim auctor, eu malesuada nulla pharetra. Pellentesque ut turpis sit amet lorem rhoncus faucibus sed facilisis ante.`, image:'https://i.pinimg.com/originals/2f/b2/41/2fb241498d55157668ca09f6175a9636.jpg'},
    {title:'lorem ipsum', content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur nisl metus. Ut auctor dui ante, a hendrerit augue interdum a. Praesent non tempor arcu. Curabitur et viverra nunc. Quisque interdum est non nisi lobortis, id rhoncus eros molestie. Integer mollis mauris nunc, condimentum ultricies nibh dictum sed. Morbi aliquet semper lectus sit amet porta.

Mauris nec elementum justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ornare, purus vel iaculis aliquam, tellus magna vehicula urna, id volutpat diam odio sit amet nulla. Vivamus semper facilisis nunc. Curabitur lobortis eros a lobortis malesuada. Vestibulum orci magna, sagittis sed nisl ut, egestas tincidunt ligula. Sed tincidunt quam sed justo gravida fermentum. Ut at est id nibh varius laoreet vitae eget odio. Aliquam facilisis mollis varius. Sed ut risus lobortis, posuere erat tincidunt, pulvinar nibh. Mauris ac turpis lobortis, pellentesque ante quis, rutrum neque. Aenean eu sagittis felis. Nunc fringilla sit amet odio eu tristique.

Pellentesque accumsan eros in tincidunt tincidunt. Maecenas mattis ante id enim egestas, vitae lacinia leo iaculis. Suspendisse potenti. Sed lobortis vulputate pharetra. Aliquam erat volutpat. Nam congue faucibus neque, vel laoreet nulla varius sit amet. Duis interdum lacus dui, sagittis luctus magna sagittis quis. Morbi in sagittis quam. Pellentesque ex leo, malesuada id augue vitae, tempus consequat eros. Aliquam eget nibh quis velit tristique tempus sit amet hendrerit augue. Duis maximus dui sit amet eros vehicula sollicitudin. Nam sit amet sodales metus, ut pharetra justo.

Nam sagittis vel mauris a sodales. Nulla nec tempor turpis. Nunc tempus scelerisque est. Cras varius dui ut metus iaculis iaculis. Pellentesque non iaculis leo, et eleifend odio. Aenean tristique consequat felis, quis vehicula lacus lobortis in. Aliquam hendrerit, libero malesuada ornare maximus, ex nibh hendrerit metus, ut volutpat lacus mauris ac lacus. Aenean condimentum id velit sit amet consectetur. Suspendisse a finibus neque, vitae accumsan ipsum. Sed sed leo magna. Vestibulum elementum luctus sapien sit amet interdum. Suspendisse eget risus non ex egestas laoreet.

Duis faucibus, magna sit amet consequat dignissim, purus odio gravida sapien, et finibus odio diam porta massa. Etiam non velit et risus maximus bibendum. Mauris dignissim lacinia porttitor. Ut vitae est sit amet libero ullamcorper consequat. Proin sit amet finibus lectus. Aenean et mollis purus. Suspendisse varius nisi eu est ultrices, eget ultrices augue hendrerit. Ut luctus lorem metus, nec gravida eros dapibus vel. Aliquam pulvinar justo non tellus interdum, vitae dictum ligula auctor. Aliquam suscipit est non enim auctor, eu malesuada nulla pharetra. Pellentesque ut turpis sit amet lorem rhoncus faucibus sed facilisis ante.`, image:'https://i.pinimg.com/originals/2f/b2/41/2fb241498d55157668ca09f6175a9636.jpg'},
    {title:'lorem ipsum', content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur nisl metus. Ut auctor dui ante, a hendrerit augue interdum a. Praesent non tempor arcu. Curabitur et viverra nunc. Quisque interdum est non nisi lobortis, id rhoncus eros molestie. Integer mollis mauris nunc, condimentum ultricies nibh dictum sed. Morbi aliquet semper lectus sit amet porta.

Mauris nec elementum justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ornare, purus vel iaculis aliquam, tellus magna vehicula urna, id volutpat diam odio sit amet nulla. Vivamus semper facilisis nunc. Curabitur lobortis eros a lobortis malesuada. Vestibulum orci magna, sagittis sed nisl ut, egestas tincidunt ligula. Sed tincidunt quam sed justo gravida fermentum. Ut at est id nibh varius laoreet vitae eget odio. Aliquam facilisis mollis varius. Sed ut risus lobortis, posuere erat tincidunt, pulvinar nibh. Mauris ac turpis lobortis, pellentesque ante quis, rutrum neque. Aenean eu sagittis felis. Nunc fringilla sit amet odio eu tristique.

Pellentesque accumsan eros in tincidunt tincidunt. Maecenas mattis ante id enim egestas, vitae lacinia leo iaculis. Suspendisse potenti. Sed lobortis vulputate pharetra. Aliquam erat volutpat. Nam congue faucibus neque, vel laoreet nulla varius sit amet. Duis interdum lacus dui, sagittis luctus magna sagittis quis. Morbi in sagittis quam. Pellentesque ex leo, malesuada id augue vitae, tempus consequat eros. Aliquam eget nibh quis velit tristique tempus sit amet hendrerit augue. Duis maximus dui sit amet eros vehicula sollicitudin. Nam sit amet sodales metus, ut pharetra justo.

Nam sagittis vel mauris a sodales. Nulla nec tempor turpis. Nunc tempus scelerisque est. Cras varius dui ut metus iaculis iaculis. Pellentesque non iaculis leo, et eleifend odio. Aenean tristique consequat felis, quis vehicula lacus lobortis in. Aliquam hendrerit, libero malesuada ornare maximus, ex nibh hendrerit metus, ut volutpat lacus mauris ac lacus. Aenean condimentum id velit sit amet consectetur. Suspendisse a finibus neque, vitae accumsan ipsum. Sed sed leo magna. Vestibulum elementum luctus sapien sit amet interdum. Suspendisse eget risus non ex egestas laoreet.

Duis faucibus, magna sit amet consequat dignissim, purus odio gravida sapien, et finibus odio diam porta massa. Etiam non velit et risus maximus bibendum. Mauris dignissim lacinia porttitor. Ut vitae est sit amet libero ullamcorper consequat. Proin sit amet finibus lectus. Aenean et mollis purus. Suspendisse varius nisi eu est ultrices, eget ultrices augue hendrerit. Ut luctus lorem metus, nec gravida eros dapibus vel. Aliquam pulvinar justo non tellus interdum, vitae dictum ligula auctor. Aliquam suscipit est non enim auctor, eu malesuada nulla pharetra. Pellentesque ut turpis sit amet lorem rhoncus faucibus sed facilisis ante.`, image:'https://i.pinimg.com/originals/2f/b2/41/2fb241498d55157668ca09f6175a9636.jpg'},
   ]

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
