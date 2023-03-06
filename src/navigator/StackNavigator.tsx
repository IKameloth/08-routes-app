import { createStackNavigator } from '@react-navigation/stack'
import { useContext } from 'react'
import { MapScreen } from '../screens/MapScreen'
import { PermissionScreen } from '../screens/PermissionScreen'
import { PermissionsContext } from '../context/PermissionContext'
import { LoadingScreen } from '../screens/LoadingScreen'

const Stack = createStackNavigator()

const StackNavigator = () => {
  const { permissions } = useContext(PermissionsContext)

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
