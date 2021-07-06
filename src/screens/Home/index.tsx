import React, { useState, useCallback } from 'react';

import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLLECTION_APPOINTMENT } from '../../configs/database';

import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { styles } from './styles';

export function Home() {
   const [category, setCategory] = useState('');

   const navigation = useNavigation();

   const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
   const [loading, setLoading] = useState(true);


   function handleAppointmentDetails(guildSelected: AppointmentProps) {
      navigation.navigate('AppointmentDetails', { guildSelected });
   }

   function handleAppointmentCreate() {
      navigation.navigate('AppointmentCreate');
   }

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId);
   }

   async function loadAppointments() {
      const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
      const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

      if (category) {
         setAppointments(storage.filter(item => item.category === category));
      } else {
         setAppointments(storage);
      }

      setLoading(false);
   }

   //quando tiver foco nessa tela cai nessa função

   useFocusEffect(useCallback(() => {
      loadAppointments();
   }, [category]));

   //toda vez que eu selecionar uma nova categoria vai recarregar a listagem

   return (
      <Background>
         <View style={styles.header}>
            <Profile />
            <ButtonAdd onPress={ handleAppointmentCreate } />
         </View>

            <CategorySelect
               categorySelected={category}
               setCategory={handleCategorySelect}
            />
         {
            loading ? <Load /> :
            <>
               <ListHeader
                  title="Partidas agendadas"
                  subtitle={`Total ${appointments.length}`}
               />

               <FlatList
                  data={appointments}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                     <Appointment
                        data={item}
                        onPress={() => handleAppointmentDetails(item)}
                     />
                  )}
                  ItemSeparatorComponent={() => <ListDivider />}
                  contentContainerStyle={{
                     paddingBottom: 69
                  }}
                  style={styles.matches}
                  showsVerticalScrollIndicator={false}
               />
            </>
         }

      </Background>
   )
}

// Flat list e como um infinity scroll e é mais performática por isso
// do que a scroll view que renderiza todos elementos de uma lista
