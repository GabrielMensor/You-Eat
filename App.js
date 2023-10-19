import { StatusBar } from 'expo-status-bar';
import Routes from './src/navigation/Routess'
import firebase from './FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';

/* import { UserProvider } from './UseContext';
 */

import AuthProvider from './src/contexts/authContext';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor={'transparent'} translucent={true} />
          <Routes/>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}