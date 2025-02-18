import {
  Camera,
  getCameraDevice,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor
} from 'react-native-vision-camera'
import {Canvas, Line, vec} from '@shopify/react-native-skia';
import {
  Delegate,
  Dims,
  MediapipeCamera,
  Point,
  RunningMode,
  denormalizePoint,
  faceLandmarkDetectionModuleConstants,
  framePointToView,
  useFaceLandmarkDetection,
} from 'react-native-mediapipe';
import {
  Face,
  FaceDetectionOptions,
  useFaceDetector,
} from 'react-native-vision-camera-face-detector'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, {useEffect, useRef, useState} from'react';

import { Worklets } from 'react-native-worklets-core'

// this code converts each segment from the "normalized" coordinate space
// that the face landmarks are in (0-1) to the "view" coordinate space
export function convertToViewSpace(
  segment,
  frameSize,
  viewSize,
  mirrored,
) {
  return {
    startPoint: framePointToView(
      denormalizePoint(segment.startPoint, frameSize),
      frameSize,
      viewSize,
      'cover',
      mirrored,
    ),
    endPoint: framePointToView(
      denormalizePoint(segment.endPoint, frameSize),
      frameSize,
      viewSize,
      'cover',
      mirrored,
    ),
  };
}

const landmarks =  faceLandmarkDetectionModuleConstants()?.knownLandmarks

const eyeLandmarks = {
  // left: faceLandmarkDetectionModuleConstants().knownLandmarks.leftEye,
  // right: faceLandmarkDetectionModuleConstants().knownLandmarks.rightEye,
  left: faceLandmarkDetectionModuleConstants().knownLandmarks.leftEyebrow,
  right: faceLandmarkDetectionModuleConstants().knownLandmarks.rightEyebrow,
};

export default Homepage = () => {

    const camera = useRef(null);
    const devices = Camera.getAvailableCameraDevices()
    const device = getCameraDevice(devices, 'front')
    const cameraPermission = useCameraPermission();
    const [showCamera, setShowCamera] = useState(true);
    const [imageSource, setImageSource] = useState('');

    const faceDetectionOptions = useRef<FaceDetectionOptions>( {
      // detection options
    } ).current
    const { detectFaces } = useFaceDetector( faceDetectionOptions )
    const [segments, setSegments] = useState([
      {startPoint: {x: 0, y: 0}, endPoint: {x: 100, y: 100}},
    ]);
  
  
    useEffect(() => {
      async function getPermission() {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log(newCameraPermission);
      }
      getPermission();
    }, []);

    const faceDetection = useFaceLandmarkDetection(
      (results, viewSize, mirrored) => {
        const landmarks = results.results[0].faceLandmarks[0];
        if (!landmarks || landmarks.length === 0) {
          return;
        }
        const frameSize = {
          width: results.inputImageWidth,
          height: results.inputImageHeight,
        };
        console.log('Results --> ', results.results[0].faceLandmarks[0])
        // get all the segments for the eyes
        const leftEyeSegments = eyeLandmarks.left.map(seg =>
          convertToViewSpace(
            {
              startPoint: landmarks[seg.start],
              endPoint: landmarks[seg.end],
            },
            frameSize,
            viewSize,
            mirrored,
          )
        );
        const rightEyeSegments = eyeLandmarks.right.map(seg =>
          convertToViewSpace(
            {
              startPoint: landmarks[seg.start],
              endPoint: landmarks[seg.end],
            },
            frameSize,
            viewSize,
            mirrored,
          ),
        );
        setSegments([leftEyeSegments, rightEyeSegments].flat());
      },
      error => {
        console.error(`onError: ${error}`);
      },
      RunningMode.LIVE_STREAM,
      'face_landmarker.task',
      {
        delegate: Delegate.GPU,
      },
    );
  
  
    const capturePhoto = async () => {
      if (camera.current !== null) {
        const photo = await camera.current.takePhoto({});
        setImageSource(photo.path);
        setShowCamera(false);
        console.log(photo.path);
      }
    };
  
    if (device == null) {
      return <Text>Camera not available</Text>;
    }

    const handleDetectedFaces = Worklets.createRunOnJS( face => { 
      console.log( 'handle detected face', face )
    })
    const frameProcessor = useFrameProcessor((frame) => {
      'worklet'
        // const faces = scanFaces(frame)
        const faces = detectFaces(frame)
        handleDetectedFaces(faces)
        console.log('faces detected', faces)
    }, [])

    const RequestPermissions= ({hasCameraPermission, requestCameraPermission}) => {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native Mediapipe</Text>
          <View style={styles.permissionsContainer}>
            {!hasCameraPermission && (
              <Text style={styles.permissionText}>
                React Native Mediapipe needs{' '}
                <Text style={styles.bold}>Camera permission</Text>.{' '}
                <Text style={styles.hyperlink} onPress={requestCameraPermission}>
                  Grant
                </Text>
              </Text>
            )}
          </View>
        </View>
      );
    };


    return (
      <SafeAreaView style={styles.root}>
        {cameraPermission.hasPermission ? (
          <View style={styles.container}>
            <MediapipeCamera style={styles.camera} solution={faceDetection} activeCamera='back'/>
            <Canvas style={styles.overlay}>
              {segments.map((segment, index) => (
                <Line
                  key={index}
                  p1={vec(segment.startPoint.x, segment.startPoint.y)}
                  p2={vec(segment.endPoint.x, segment.endPoint.y)}
                  color="red"
                  style="stroke"
                  strokeWidth={2}
                />
              ))}
            </Canvas>
          </View>
        ) : (
          <RequestPermissions
            hasCameraPermission={cameraPermission.hasPermission}
            requestCameraPermission={cameraPermission.requestPermission}
          />
        )}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  welcome: {color: 'black', fontSize: 38, fontWeight: 'bold', maxWidth: '80%'},
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
     top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoriesText: {color: 'black', fontSize: 36},
  permissionsContainer: {
    marginTop: 30,
  },
  permissionText: {
    color: 'black',
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
