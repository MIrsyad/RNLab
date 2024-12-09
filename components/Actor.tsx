import { Text, View } from "react-native"
import { ICast } from "./movieCard"

const Actor = (data:ICast) => {
    return (
        <View style={{justifyContent:'center', alignItems:'center',width:100}}>
            <View style={{height:100, width:80,borderRadius:8, backgroundColor:'gray'}}/>
            <Text numberOfLines={1} style={{textAlign:'center'}}>{data.character}</Text>
            <Text numberOfLines={1} style={{textAlign:'center'}}>{data.actor}</Text>
        </View>
    )
}

export default Actor