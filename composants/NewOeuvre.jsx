import { StyleSheet, Text, View , Button , TextInput , FlatList } from 'react-native'
import React , {useState} from 'react'
import db from "../config"
import {addDoc , collection } from "firebase/firestore"
import { schemaOeuvres }  from "../Verif/oeuvres.jsx"

const NewOeuvre = ({navigation}) => {
    const [nom, setNom]= useState("");
    const [description, setDescription]= useState("");
    const [adresse, setAdresse]= useState("");
    const [erreurs, setErreurs]= useState([]);

    const handleSubmit = function(){
        const oeuvre = {
            nom , description , adresse
        }
        const {error} = schemaOeuvres.validate(oeuvre)
        if(!error){
            addDoc(collection(db, "oeuvres") , oeuvre)
            .then(function(){ 
             navigation.push('Galerie')
            })
            .catch(function(error){
                setErreurs([error.message]);
            });
        };
    }
  return (
    <View>
      <Text>Créer une nouvelle oeuvre</Text>
      <TextInput placeholder="nom" onChangeText={function(text){ setNom(text) ; setErreurs([]);}} value={nom} style={styles.input} />
      <TextInput placeholder="adresse de l'image" onChangeText={function(text){ setAdresse(text) ; setErreurs([]);}} value={adresse} style={styles.input} />
      <TextInput placeholder="description" onChangeText={function(text){ setDescription(text) ; setErreurs([]);}} value={description} style={styles.input} multiline={true} numberOfLines={3} />
      <Button title="créer" onPress={handleSubmit} />
      <FlatList 
        data={erreurs}
        renderItem={function({item}){ return <Text>{item}</Text> }}
      />
    </View>
  )
}

export default NewOeuvre

const styles = StyleSheet.create({
    input : {
        borderColor : "black" , padding : 10 , borderWidth : 2 , marginVertical : 10
    }
})
