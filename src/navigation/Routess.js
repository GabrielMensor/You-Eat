
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

const Stack = createNativeStackNavigator();

export default function Routes() {

/*   const [accountType, getaccountType] = useState()
  function verTipoConta(){
    if (accountType == 'emp') {
      alert('Perfil de Empreendedor')
    }else if (accountType == 'ent') {
      alert('Perfil de Entregador')
    }else if (accountType == 'clie'){
      alert('Perfil de Cliente')
    } else {
      alert('Perfil inválido')
    }
  } */
    return(
        <Stack.Navigator>          
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: 'Bem-vindo' }}
            screenOption={{
              headerShown: false,   // ver mais tarde sobre animações na navegação
            }}/>

          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: 'Entre' }}/>

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: 'Cadastre'}}/>
          
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ title: 'Confirme' }}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Casa'}}/>

          <Stack.Screen
            name="ModelClient"
            component={ModelClient}
            options={{ title: 'Perfil Cliente'}}/>

          <Stack.Screen
            name="ModelDeliveryman"
            component={ModelDeliveryman}
            options={{ title: 'Perfil Entregador'}}/>

          <Stack.Screen
            name="ModelEntrepreneur"
            component={ModelEmtrepreneur}
            options={{ title: 'Perfil Empreendedor'}}/>

          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ title: 'Carrinho' }}/>

          <Stack.Screen
            name="ModelProduct"
            component={ModelProduct}
            options={{ title: 'Produto' }}/>
          
          <Stack.Screen
            name="ModelRequests"
            component={ModelRequests}
            options={{ title: 'Meu Pedido' }}/>

          <Stack.Screen
            name="ProductRegistration"
            component={ProductRegistration}
            options={{ title: 'Cadastro do produto' }}/>

          <Stack.Screen
            name="RequestApproval"
            component={RequestApproval}
            options={{ title: 'Aprovação de pedido' }}/>

          <Stack.Screen
            name="DeliveryNotice"
            component={DeliveryNotice}
            options={{ title: 'Aviso de pedido' }}/>
          
          <Stack.Screen
            name="ModelProductEntrepreneur"
            component={ModelProductEntrepreneur}
            options={{ title: 'Produto para Empreendedor' }} />
        </Stack.Navigator>
    )
}