import { StatusBar } from 'expo-status-bar';
import Routes from './src/navigation/Routess'
import firebase from './FirebaseConfig';
import ContextProvider from './src/contexts/userContext';

export default function App() {
  return (
    <>
    <ContextProvider>
        <Routes/>
    </ContextProvider>
    </>
  );
}
