import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import db from '../config';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { GestureHandlerRootView, TouchableHighlight } from 'react-native-gesture-handler';

const Accueil = ({ navigation }) => {

  const [etudiants, setEtudiants] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const handleButtonClick = useCallback((item) => {
    navigation.navigate('infos', {
      item: {
        id: item.id,
        nom: item.nom,
        description: item.description,
        auteur: item.auteur,
        adresse: item.adresse,
      },
    });
  }, [navigation]);

  useEffect(() => {

    getDocs(collection(db, "oeuvres"))
    .then(function(snapShot){
        const data = [];
        snapShot.docs.map(function(doc){
            data.push({...doc.data(), id : doc.id})
        })
       setEtudiants(data);
       
    })

  }, [updateList]);

  return (
    <View style={style.ecran}>
      <GestureHandlerRootView>
        <View>
          <Text style={style.titre}>Galerie</Text>
          <FlatList
            style={style.flat}
            data={etudiants}
            renderItem={function({ item }) {
              return <View style={{ flexDirection : "row" , padding : 5 , alignSelf : "center"}}>
                <TouchableHighlight onPress={() => handleButtonClick(item)} style={[style.btn]}>
                  <View style={[style.viewimg]}>
                    <Image
                      source={{ uri: item.adresse, width: 100, height: 100 }}
                      style={style.img}
                    />
                    <View style={style.align}>
                      <Text style={style.text}>nom : { item.nom }</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            }}
          />
        </View>
      </GestureHandlerRootView>
    </View>
  )
}

export default Accueil;

const style = StyleSheet.create({
  flat :{
    marginBottom : 0,
    backgroundColor: "transparent"
  },
  ecran : {
      marginBottom : 200
  },
  align : {
    flexDirection : 'column'
  },
  btn: {
    backgroundColor: '#BBBEEC',
    padding : 30,
    margin: 10,
    width : 350,
    borderRadius: 30,
    touchableHighlight: '#878BC4',
  },
  text: {
    marginTop: 20,
    fontSize: 17,
    color: 'black',
    textAlign : 'center',
  },
  viewimg: {
    flexDirection: 'row',
    marginRight: 15,
  },
  img: {
    marginRight: 15,
  },
  titre: {
    backgroundColor: "transparent",
    margin: 5,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});
