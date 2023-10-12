import { StyleSheet, Text, View , Image} from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaEtudiant } from '../Verif/etudiant'
import db from "../config"
import {  getDoc, updateDoc , doc  } from "firebase/firestore"


const Infos = ({ route }) => {
  const item = route.params.item;

  return (
    <View style={style.card}>
        <Image style={style.image} source={{ uri: item.adresse , width: 200, height: 200 }}/>
        <Text style={style.text}>Nom : {item.nom}</Text>
        <Text style={style.text}>Description : {item.description}</Text>
        <Text style={style.text}>Auteur : {item.auteur}</Text>
    </View>
  );
};

export default Infos;


const style = StyleSheet.create({
  card: {
    backgroundColor: "#93A2D5",
    margin : 15,
    padding : 20,
    borderRadius : 20,
    width: 350,
    alignSelf : "center" ,
  },
  image : {
    marginRight : 30,
    alignSelf:'center',
    marginBottom : 30,
  },
  text : {
    fontSize : 19,
    marginBottom : 20
  },
});
