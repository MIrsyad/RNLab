import { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { _itemheight, _itemwidth, height, width } from "../assets/constant"
import Icon from '@react-native-vector-icons/ant-design';
import CButton from "./button";
import Actor from "./Actor";

export interface ICard {
index : number
indexActive : number | null
data : IMovie
expanded: boolean | undefined
currentIndex : number
scrollx : SharedValue<number>
handlePressItem: (index : number) => void
}
export interface ICast {
    actor: string;
    character: string;
  }
  
export interface IMovie {
    id: number;
    title: string;
    year: number;
    genre: string;
    director: string;
    cast: ICast[]; 
    rating: number;
    duration: string; 
    language: string;
    country: string;
    boxOffice: string; 
    poster: string; 
    description: string;
  }

const Card = ( {data, expanded, currentIndex, indexActive, index , handlePressItem,scrollx} : ICard) => {
const widthAnimated = useSharedValue(_itemwidth );
const heigthAnimated = useSharedValue(_itemheight );
const IwidthAnimated = useSharedValue(_itemwidth );
const IheigthAnimated = useSharedValue(100);
const translateX = useSharedValue<number>(0);

// for determine is there any expanded card
const [activetemp, setActivetemp] = useState(false)    

//card animation
const stylez = useAnimatedStyle(() => {
    return {
    // scaling the card size based on index position, the further the more smaller
    transform: [{scale :interpolate(scrollx.value,[
        index-24, index , index +24
    ],[-0.8,1,0,8],Extrapolation.CLAMP)},
    {translateX :  withSpring(translateX.value)}],
    width:widthAnimated.get(),
    height: heigthAnimated.get(),
    }
})

//animating the image
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

// move the card with animation based on card position index to the actice/expanded card
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

// change the width and heigh of card and image if the card is expanded
useEffect(() => {
    widthAnimated.value = withSpring(activetemp == true ? width: _itemwidth);
    heigthAnimated.value = withSpring(activetemp == true ? height - 20 : _itemheight);
    IheigthAnimated.value = withSpring(activetemp == true ? _itemwidth : 100);
    IwidthAnimated.value = withSpring(activetemp == true ? width : _itemwidth);
}, [activetemp])

return (
    //touchablecomponent card, disabled when not focused and any card is expanded
    <TouchableWithoutFeedback disabled={currentIndex != index || expanded} onPress={handlePress}>
        <Animated.View style={[stylez,{
            backgroundColor: 'white',
            borderRadius: 15,
            }, styles.shadow]}>
            <View style={{padding : 8, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                {/* render close button to close the expanded card */}
                {activetemp && 
                <TouchableOpacity  style={{position:'absolute', top:4, left:4,zIndex:1000}} onPress={handlePress}>
                <Text style={{fontSize: 14}}>Close</Text>
                </TouchableOpacity>
                }
                <Text style={{textAlign:'center',flex:1, fontSize:20, fontWeight:'800'}}>{data.title}</Text>
            </View>
        {/* for scrolling the entire card details, disabled when not expanded */}
        <ScrollView scrollEnabled={activetemp} contentContainerStyle={{ flexGrow: 1 }}>
            <Animated.Image style={styleImage} source={{uri : data.poster}}/>
            {activetemp && 
            <>
                <View>
                    <CButton text="Watch Now" Left={<Icon name="plus" size={30} color="white" />} />
                </View>
                <View style={{paddingHorizontal:8}}>
                    <View style={{width:'100%', borderColor:'gray',borderWidth:1}}/>
                    <Text style={{fontSize:16,fontWeight:600}}>Actor</Text>
                    <ScrollView >
                        <View style={{flexDirection:'row',columnGap:8}}>
                         {data.cast.map(element => <Actor key={element.actor} actor={element.actor} character={element.character}/>)}
                        </View>
                    </ScrollView>
                </View>
            </>
            }
            <Text style={{textAlign:'justify',padding:8}} numberOfLines={!activetemp? 7 : undefined}>{data.description}</Text>
        </ScrollView >
        </Animated.View>
    </TouchableWithoutFeedback>
    )
}

export default Card

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