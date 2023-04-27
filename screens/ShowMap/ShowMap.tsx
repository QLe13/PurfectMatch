import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, MapViewProps } from 'react-native-maps';

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<Coordinate>>,
    setShowMap: React.Dispatch<React.SetStateAction<boolean>>,
}

const ShowMap: React.FC<Props> = ({setLocation, setShowMap }) => {
  const [location, setCurLocation] = useState<Coordinate>([0,0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        //maybe having warning pop up here would be nice
        return;
      }
      const lastKnownLocation = await Location.getCurrentPositionAsync({});
      // getting user last known location or setting it to 0,0
      setCurLocation([lastKnownLocation.coords.latitude, lastKnownLocation.coords.longitude])
      setIsLoading(true)
    })();
  }, []);

  useEffect(() => {
    setLocation(location)
    }, [location])

  const handleGetCurrLocation = async () => {
    const curLocation = await Location.getCurrentPositionAsync({});
    setLocation([curLocation.coords.latitude, curLocation.coords.longitude]);
    } // to be used later when the user wants to get his/her current location

    const handleRegionChange = (region: MapViewProps['region']) => {
        setCurLocation([region?.latitude||0, region?.longitude||0]);
      };
  return (
    <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={()=>setShowMap(false)}>
                <Text style={{fontSize:25}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={()=>setShowMap(false)}>
                <Text style={{fontSize:25}}>Apply</Text>
            </TouchableOpacity>
        </View>
        <MapView style={styles.mapView}
            region={
                {
                    latitude: location[0],
                    longitude: location[1],
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            }
            onRegionChangeComplete={handleRegionChange}>
            <Marker title='Home' coordinate={{latitude: location[0], longitude: location[1]}} />
        </MapView>
        <View style={styles.loading}>
            {!isLoading && 
            <>
            <ActivityIndicator size="large" color="black" />
                <Text>Loading...</Text>
            </>
            }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonsContainer: {
        flexDirection: 'row',
        zIndex: 10,
        justifyContent: 'space-between',
        width: '70%',//when you add this by 1
        position: 'absolute',
        bottom: 20,
        left: '15%', //this will be minus by 1/2
    },
    mapView: {
        flex: 1,
        shadowColor: '#000',
        borderRadius: 7,
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
        top: '45%',
        left: '40%',
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    applyButton: {
        backgroundColor: '#fff',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

})

export default ShowMap
