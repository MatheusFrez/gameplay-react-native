import React from 'react';
import { useState } from 'react';
import { TextInput, TextInputProps, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';

type props = TextInputProps & {
   minLength?: number;
   maxLength?: number;
}

export function TextArea({ minLength, maxLength, ...rest }: props) {
   const [isValidText, setIsValidText] = useState(false);

   function handleValidText(text: any) {
      const textReady = text.trim();
      if(minLength && maxLength) {
         if(textReady.length >= minLength && textReady.length <= maxLength) {
            setIsValidText(true);
         } else {
            setIsValidText(false);
         }
      }
   }

   return (
      <>
         <TextInput
            style={styles.container}
            {...rest}
            onChangeText={handleValidText}
         />
         {
            isValidText ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
               <Text
                  style={styles.errorMessage}
               >
                  { `Descrição deve ter no mínimo ${minLength} caracteres e no máximo ${maxLength}` }
               </Text>
            </Animatable.View>
         }

      </>
   )
}
