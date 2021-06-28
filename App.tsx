import React from 'react';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

import AppLoading from 'expo-app-loading';
import {
  StatusBar
} from 'react-native';
import { Routes } from './src/routes';
import { Bakground } from './src/components/Background';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading /> //componente que segura a tela de splash
  } // deixa a tela de splash enquanto as fontes do aplicativo não são carregadas

  return (
    <Bakground>
      <StatusBar
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </Bakground>
  )
}