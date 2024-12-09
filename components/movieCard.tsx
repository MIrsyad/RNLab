import { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { _itemheight, _itemwidth, height, width } from "../assets/constant"

export interface ICard {
index : number
indexActive : number | null
data : IData
expanded: boolean | undefined
currentIndex : number
scrollx : SharedValue<number>
handlePressItem: (index : number) => void
}

export interface IData {
title : string;
content : string;
image?: string;
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