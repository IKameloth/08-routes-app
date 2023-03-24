import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
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
  const [showPolyline, setShowPolyline] = useState(true)
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines
  } = useLocation()

  const mapViewRef = useRef<MapView>()
  const following = useRef<boolean>(true)

  useEffect(() => {
    followUserLocation()
    return () => {
      stopFollowUserLocation()
    }
  }, [])

  useEffect(() => {
    if (!following.current) return

    const { latitude, longitude } = userLocation

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude
      }
    })
  }, [userLocation])

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation()
    following.current = true

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
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
        onTouchStart={() => (following.current = false)}
      >
        {showPolyline && <Polyline coordinates={routeLines} strokeColor="purple" strokeWidth={3} />}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{ position: 'absolute', bottom: 80, right: 20 }}
      />
    </View>
  )
}
