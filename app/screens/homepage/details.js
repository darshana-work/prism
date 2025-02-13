import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {ScrollView} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

export default Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const productDetails = route?.params?.productDetails;
  let productGallery = productDetails?.gallery;
  const data = [...new Array(productGallery.length).keys()];
  const ref = React.useRef(null);
  const progress = useSharedValue(0);

  const onPressPagination = index => {
    ref.current?.scrollTo({
      count: index - progress?.value,
      animated: true,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={{height: '90%'}}>
          <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
            <View style={styles.imageGallery}>
              <View style={{flex: 1}}>
                <Carousel
                  ref={ref}
                  width={500}
                  height={400}
                  data={productGallery}
                  onProgressChange={progress}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{uri: 'https://images.free3d.com/imgd/' + item}}
                        style={{
                          flex: 1,
                          width: null,
                          height: null,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  )}
                />
                <Pagination.Basic
                  progress={progress}
                  data={data}
                  dotStyle={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 50,
                  }}
                  containerStyle={{gap: 10, marginTop: -20, zIndex: 1}}
                  onPress={onPressPagination}
                />
              </View>
            </View>
            <View style={{padding: 10}}>
              <Text style={styles.productName}>
                {productDetails?.name}
                <Text style={styles.productDescription}>
                  {' ' + productDetails?.description}
                </Text>
              </Text>
              <Text style={styles.productPrice}>
                MRP:{' '}
                <Text style={{fontWeight: 'bold', color: '#1C2B36'}}>
                  ${productDetails?.price}
                </Text>
              </Text>
              <Text style={styles.productQuantity}>
                Hurry, only {productDetails?.quantity} left!
              </Text>
              <View style={styles.tryOnContainer}>
                <Text style={styles.tryOn}>Try it out on your face</Text>
                <TouchableOpacity style={styles.tryOnButton} onPress={()=> {navigation.navigate('tryon')}}>
                  <Text style={styles.tryOnText}>3D Try On</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.productPrice, {fontSize: 15}]}>
                Colour:{' '}
                <Text style={{fontWeight: 'bold', color: '#1C2B36'}}>
                  {productDetails?.color}
                </Text>
              </Text>
              <Text style={[styles.productPrice, {fontSize: 15}]}>
                Size:{' '}
                <Text style={{fontWeight: 'bold', color: '#1C2B36'}}>
                  {productDetails?.size}
                </Text>
              </Text>
              <Text style={styles.measurements}>
                Product Measurement:{' '}
                <Text style={{fontWeight: 'normal'}}>
                  {productDetails.measurements}
                </Text>
              </Text>
              <Text style={styles.seller}>
                Seller:{' '}
                <Text style={{color: '#224078'}}>{productDetails.seller}</Text>
              </Text>
              <View style={styles.detailsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '50%'}}>
                    <Text style={styles.detailTitle}>Feature</Text>
                    <Text style={styles.detailDescription}>
                      {productDetails.feature}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.detailTitle}>Sustainable</Text>
                    <Text style={styles.detailDescription}>
                      {productDetails.sustainable}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailTitle}>Frame Material</Text>
                  <Text style={styles.detailDescription}>
                    {productDetails.frameMaterial}
                  </Text>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailTitle}>Product Details</Text>
                  <Text style={styles.detailDescription}>
                    {productDetails.details}
                  </Text>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailTitle}>Material & Care</Text>
                  <Text style={styles.detailDescription}>
                    {productDetails.material}
                  </Text>
                  <Text style={styles.detailDescription}>
                    {productDetails.care}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buyNow}>
            <Text style={{color: '#456990'}}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCart}>
            <Text style={{color: '#FFF'}}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    backgroundColor: '#FFF',
  },
  imageGallery: {
    height: 400,
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  tryOnContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#D9F2EF',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
  },
  tryOnButton: {
    backgroundColor: '#456990',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
  },
  tryOnText: {
    color: '#D9F2EF',
    fontSize: 15,
  },
  tryOn: {
    fontSize: 15,
    // fontWeight: '700',
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C2B36',
  },
  productDescription: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'normal',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'normal',
    marginTop: 5,
  },
  productQuantity: {
    marginTop: 10,
    color: '#F07837',
    fontWeight: '800',
  },
  measurements: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 5,
    color: '#666',
  },
  seller: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 5,
    color: '#666',
    marginBottom: 10,
  },
  buttonsContainer: {
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 80,
    position: 'absolute',
  },
  buyNow: {
    borderWidth: 1,
    borderColor: '#456990',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 40,
  },
  addToCart: {
    backgroundColor: '#456990',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 40,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
    color: '#666',
  },
  detailDescription: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 2,
  },
  detailsSection: {
    marginTop: 20,
  },
});
