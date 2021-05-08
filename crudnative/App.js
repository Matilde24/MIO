
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Inicio from './Views/Inicio';
import NuevoCliente from './Views/NuevoCliente';
import DetallesCliente from './Views/DetallesCliente';
import BarraSuperior from './componets/ui/Barra';

import { DarkTheme, Provider as PaperProvider } from 'react-native-paper';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Definir tema

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}



const App = () => {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >



            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={({ navigation, route }) => ({
                headerTitleAlign: 'center',
               // headerLeft: (props) => <BarraSuperior {...props}
                 // navigation={navigation}
                  //route={route}
                ///>


              })}
            />

            <Stack.Screen
              name="NuevoCliente"
              component={NuevoCliente}
              options={{
                title: "Nuevo Cliente"
              }}
            />

            <Stack.Screen
              name="DetallesCliente"
              component={DetallesCliente}
              options={{
                title: "Detalles Cliente"
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>    

      </PaperProvider>

    </>

  );
};


const styles = StyleSheet.create({

});

export default App;
