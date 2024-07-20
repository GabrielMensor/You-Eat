import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import ModelClient from '../screens/ModelClient';
import ModelEmtrepreneur from '../screens/ModelEntrepreneur';
import ModelDeliveryman from '../screens/ModelDeliveryman';
import Cart from '../screens/Cart';
import ModelProduct from '../screens/ModelProduct';
import ModelRequests from '../screens/ModelRequests';
import RequestApproval from '../screens/RequestApproval';
import ProductRegistration from '../screens/ProductRegistration';
import Verification from '../screens/Verification';
import DeliveryNotice from '../screens/DeliveryNotice';
import ModelProductEntrepreneur from '../screens/ModelProductEntrepreneur'
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: null,
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }} />

        {/*         <Stack.Screen
          name="Verification"
          component={Verification}
          options={{ title: 'Confirme' }} /> */}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="ModelClient"
          component={ModelClient}
          options={{
            title: 'Perfil Cliente',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="ModelDeliveryman"
          component={ModelDeliveryman}
          options={{
            title: 'Perfil Entregador',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="ModelEntrepreneur"
          component={ModelEmtrepreneur}
          options={{
            title: 'Perfil Empreendedor',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="ModelProduct"
          component={ModelProduct}
          options={{
            title: 'Produto',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="ModelRequests"
          component={ModelRequests}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="ProductRegistration"
          component={ProductRegistration}
          options={{
            title: 'Cadastro do produto',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="RequestApproval"
          component={RequestApproval}
          options={{
            title: 'Aprovação de pedido',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="DeliveryNotice"
          component={DeliveryNotice}
          options={{
            title: 'Aviso de pedido',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="ModelProductEntrepreneur"
          component={ModelProductEntrepreneur}
          options={{
            title: 'Meu produto',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />

        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#E65E1A',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerBackTitleStyle: {
              color: 'white',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}