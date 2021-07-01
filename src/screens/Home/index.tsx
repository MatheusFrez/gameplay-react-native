import React, { useState } from 'react';

import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { Background } from '../../components/Background';

import { styles } from './styles';

export function Home() {
   const [category, setCategory] = useState('');

   const navigation = useNavigation();

   const appointments = [
      {
         id: '1',
         guild: {
         id: '1',
         name: 'Lendários',
         icon: null,
         owner: true
         },
         category: '1',
         date: '22/06 às 20:40h',
         description: 'É hoje que vamos chegar ao challenger sem perder uma na md10'
      },
      {
         id: '2',
         guild: {
         id: '2',
         name: 'Lendários',
         icon: null,
         owner: true
         },
         category: '2',
         date: '22/06 às 20:40h',
         description: 'É hoje que vamos chegar ao challenger sem perder uma na md10'
      }
   ]

   function handleAppointmentDetails() {
      navigation.navigate('AppointmentDetails');
   }

   function handleAppointmentCreate() {
      navigation.navigate('AppointmentCreate');
   }

   function handleCategorySelect(categoryId: string) {
      categoryId === category ? setCategory('') : setCategory(categoryId);
   }

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

            <View style={styles.content}>
            <ListHeader
               title="Partidas agendadas"
               subtitle="Total 6"
            />

            <FlatList
               data={appointments}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <Appointment
                     data={item}
                     onPress={handleAppointmentDetails}
                  />
               )}
               ItemSeparatorComponent={() => <ListDivider />}
               style={styles.matches}
               showsVerticalScrollIndicator={false}
            />
         </View>
      </Background>
   )
}

// Flat list e como um infinity scroll e é mais performática por isso
// do que a scroll view que renderiza todos elementos de uma lista
