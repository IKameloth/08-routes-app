import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import { LoadingScreen } from '../screens/LoadingScreen'
import { Fab } from './Fab'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export const Map = () => {
  const { hasLocation, initialPosition, getCurrentLocation } = useLocation()
  const mapViewRef = useRef<MapView>()

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation()

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude
      }
    })
  }

  if (!hasLocation) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        showsUserLocation
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
          title={'title'}
          description={'description'}
        /> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
    </View>
  )
}
