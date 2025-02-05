import React, {useRef} from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Video, {VideoRef} from 'react-native-video';

export default Homepage = () => {
    console.log("Homepage")
    const videoRef = useRef(VideoRef);
    // // const videoRef = useRef<VideoRef>(null);
    const background = require('../../assets/background.mp4');
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <Video 
                    ref={videoRef} 
                    source={background}
                    repeat={true}
                    playInBackground={true}
                    // style={styles.backgroundVideo}   
                    resizeMode={"cover"}
            style={{
                aspectRatio: 0.8,
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                height: 400,
                width: "100%"
            }} 
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 400,
        backgroundColor: 'red'
      },
    text: {
        fontSize: 24,
    },
})