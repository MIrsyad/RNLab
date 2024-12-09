import { Text, TouchableOpacity } from "react-native"

interface IButton {
    text : string
    Left?: React.ReactNode
}

const CButton = ({Left,text}:IButton) => {
    return(
    <TouchableOpacity style={{flex: 1,backgroundColor:'red',columnGap:10, flexDirection:'row', justifyContent:'center', alignItems:'center', padding:8,margin:8, borderRadius:8}}>
        {Left}
        <Text style={{color:"white"}}>{text}</Text>
    </TouchableOpacity>
    )
}

export default CButton