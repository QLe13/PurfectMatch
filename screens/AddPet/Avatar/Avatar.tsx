import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Avatar:React.FC = () => {
  return (
    <View style={styles.container}>
                {
                    <Image source={require('./profilePic/pig.jpeg')} style={{ width: 200, height: 200 }} />//&&image
                }
                    <View style={styles.uploadBtnContainer}>
                        <TouchableOpacity style={styles.uploadBtn} >
                            <Text> Image</Text> 
                            {/* {image ? 'Edit' : 'Upload'} */}
                        </TouchableOpacity>
                    </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})

export default Avatar