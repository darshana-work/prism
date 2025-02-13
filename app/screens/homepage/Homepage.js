import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {ScrollView} from 'react-native-gesture-handler';
import {
  useNavigation,
} from '@react-navigation/native';

// import Video, {VideoRef} from 'react-native-video';


export default Homepage = () => {
  console.log('Homepage');
  // const videoRef = useRef(VideoRef);
  const navigation = useNavigation();
  const background = require('../../assets/background.mp4');
  const prismBackground = require('../../assets/prismtexture.jpg');
  const eyeTestImage = require('../../assets/eyetest.png');
  const glassesData = [
    {
      id: 'glasses1',
      name: 'H & M',
      image: require('../../assets/glasses/glasses1/glasses1.jpg'),
      gallery: ['l43195-glasses-56919.jpg', 'l49715-glasses-56919.jpg', 'l65256-glasses-56919.jpg', 'l49715-glasses-56919.jpg'],
      color: 'Black',
      description: 'Women charcoal black framed structured eyeglass',
      price: 100,
      quantity: 10,
      size: 'M',
      measurements: 'Lens Width 54.0mm',
      seller: 'H&M Hennes & Mauritz Retail Private Limited',
      feature: 'UV Protected Lens',
      sustainable: 'Regular',
      frameMaterial: 'Plastic',
      details: 'Eyeglases with side protective plastic frame with UV-protective lenses',
      material: '3% Metal, 97% Polycarbonate',
      care: 'Wipe with a clean microfiber cloth'
    },
    {
      id: 'glasses2',
      name: 'Fastrack',
      image: require('../../assets/glasses2.png'),
      gallery: ['l10/5d54036726be8bb8538b4567/1107-frame-glasses.png', 'l73/5d54036726be8bb8538b4567/2114-frame-glasses.png'],
      color: 'Navy blue',
      description: 'Men navy blue framed structured eyeglass',
      price: 150,
      quantity: 5,
      size: 'S',
      measurements: 'Lens Width 48.0mm',
      seller: 'Fastrack Retail Private Limited',
      feature: 'UV Protected Lens',
      sustainable: 'Regular',
      frameMaterial: 'Plastic',
      details: 'Eyeglases with side protective plastic frame with UV-protective lenses',
      material: '3% Metal, 97% Polycarbonate',
      care: 'Wipe with a clean microfiber cloth'
    },
    {
      id: 'glasses3',
      name: 'RayBan',
      image: require('../../assets/glasses3.png'),
      gallery: ['l85684-sunglasses-51606.png', 'l52425-sunglasses-51606.png','l90169-sunglasses-51606.png', 'l94518-sunglasses-51606.png'],
      color: 'Black',
      description: 'Unisex black framed sunglasses',
      price: 200,
      quantity: 2,
      size: 'OneSize',
      measurements: 'Lens Width 46.0mm',
      seller: 'RayBan Retail Private Limited',
      feature: 'UV Protected Lens',
      sustainable: 'Regular',
      frameMaterial: 'Plastic',
      details: 'Eyeglases with side protective plastic frame with UV-protective lenses',
      material: '3% Metal, 97% Polycarbonate',
      care: 'Wipe with a clean microfiber cloth'
    },
    {
      id: 'glasses4',
      name: 'RayBan',
      image: require('../../assets/glasses4.jpg'),
      gallery: ['l70134-sunglass-24614.jpg','l95488-sunglass-24614.jpg','l74988-sunglass-24614.jpg', 'l19388-sunglass-24614.jpg'],
      color: 'Royale blue',
      description: 'Unisex royale blue structured sunglasses',
      price: 250,
      quantity: 15,
      size: 'OneSize',
      measurements: 'Lens Width 46.0mm',
      seller: 'RayBan Retail Private Limited',
      feature: 'UV Protected Lens',
      sustainable: 'Regular',
      frameMaterial: 'Plastic',
      details: 'Eyeglases with side protective plastic frame with UV-protective lenses',
      material: '3% Metal, 97% Polycarbonate',
      care: 'Wipe with a clean microfiber cloth'
    },
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
          {/* <View>
            <Video
              ref={videoRef}
              source={background}
              // repeat={true}
              resizeMode={'cover'}
              style={styles.backgroundVideo}
            />
          </View> */}
          <View style={{height: 200, width: '100%'}}>
            <ImageBackground
              resizeMode={'stretch'} // or cover
              style={{
                height: 200,
                width: '100%',
                opacity: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }} // must be passed from the parent, the number may vary depending upon your screen size
              source={prismBackground}>
              <Text style={styles.ourpurpose}>OUR PURPOSE</Text>
              <Text style={styles.domoretext}>DO MORE, BE MORE</Text>
            </ImageBackground>
          </View>
          <View style={styles.headingSection}>
            <Text style={styles.headingStyle}>NEW ARRIVALS</Text>
          </View>

          <ScrollView
            nestedScrollEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {glassesData.map((glass, index) => (
              <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => navigation.navigate('details', {productDetails: glass})}>
                <View style={styles.itemImage}>
                  <Image source={glass.image} style={styles.itemImageStyle} />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{glass.name}</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.itemColor}>{glass.color}</Text>
                    <Text style={styles.itemPrice}>${glass.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.headingSection}>
            <Text style={styles.headingStyle}>BOOK FREE EYE TEST</Text>
          </View>
          <View style={styles.eyetestSection}>
            <View style={styles.eyetestimage}>
              <Image source={eyeTestImage} style={styles.eyeteststyle} />
            </View>
            <View style={styles.eyetestText}>
              <Text style={styles.eyetextdescription}>
                Book a free eye test with our certified eye experts and receive
                a unique personalized eye test report.
              </Text>
              <TouchableOpacity style={styles.bookTestButton}>
                <Text style={styles.bookTestButtonText}>Book Test</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headingSection}>
            <Text style={styles.headingStyle}>GET IN TOUCH WITH US</Text>
          </View>
          <View style={styles.contactUsSection}>
              <Text style={styles.enterEmailText}>
               ENTER YOUR EMAIL ADDRESS
              </Text>
              <TextInput style={styles.emailInput}>
              </TextInput>
              <TouchableOpacity style={styles.bookTestButton}>
                <Text style={styles.bookTestButtonText}>Subscribe</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backgroundVideo: {
    aspectRatio: 1,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 400,
    width: '100%',
  },
  headingSection: {
    height: 80,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 25,
    textDecorationStyle: 'double',
    letterSpacing: 2,
    color: '#1C2B36',
  },
  scrollView: {
    backgroundColor: '#FFF',
  },
  itemContainer: {
    height: 350,
    width: 320,
    marginHorizontal: 10,
    // backgroundColor: '#FFF',
    backgroundColor: '#F4F2F2',
    shadowColor: '#000',
    padding: 20,
    marginBottom: 20,
  },
  itemImage: {
    height: 250,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageStyle: {
    height: '100%',
    width: '100%',
  },
  itemDetails: {
    marginTop: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C2B36',
  },
  itemColor: {
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    color: '#999',
    fontWeight: 'bold',
    color: '#1C2B36',
  },
  ourpurpose: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'black',
    marginBottom: 10,
  },
  domoretext: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#000',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  eyetestSection: {
    height: 500,
    width: '100%',
  },
  eyeteststyle: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
  },
  eyetestText: {
    height: 250,
    width: '100%',
    backgroundColor: 'aliceblue',
    padding: 20,
  },
  eyetextdescription: {
    fontSize: 25,
    color: '#1C2B36',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  bookTestButton: {
    height: 40,
    width: 150,
    backgroundColor: '#1C2B36',
    justifyContent: 'center',
    alignItems: 'center',

  },
  bookTestButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
    fontFamily: 'Helvetica'
  },
  enterEmailText: {
    color: '#1C2B36',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  emailInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#1C2B36',
    fontFamily: 'Roboto',   
    backgroundColor: '#FFFFFF',
  },
  contactUsSection: {
    height: 200,
    width: '100%',
    backgroundColor: 'aliceblue',
    padding: 20,
  }
});
