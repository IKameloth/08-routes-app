import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { PermissionsContext } from '../context/PermissionContext'

export const PermissionScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext)

  return (
    <View style={styles.container}>
      <Text>PermissionScreen</Text>
      <Button title="Permiss" onPress={askLocationPermission} />
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
