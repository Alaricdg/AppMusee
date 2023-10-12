import { StyleSheet, Text, View, Button, FlatList, Image, TouchableHighlight } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import db from '../config';
import { getDocs, collection, query, where } from "firebase/firestore";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Dashboard = ({ navigation, route }) => {
  const [etudiants, setEtudiants] = useState([]);
  const [login, setLogin] = useState(route.params.login);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = login === "admin" ? collection(db, "oeuvres") : query(collection(db, "oeuvres"), where("auteur", "==", login));

    getDocs(q).then(function(snapShot) {
      const data = [];
      snapShot.docs.map(function(doc) {
        data.push({ ...doc.data(), id: doc.id });
      });
      setEtudiants(data);
      setIsLoading(false);
    });
  }, [login]);

  const handleButtonClick = useCallback((item) => {
    console.log(item.id)
    navigation.navigate('oeuvre', {
      item: {
        id: item.id,
        nom: item.nom,
        description: item.description,
        auteur: item.auteur,
        adresse: item.adresse,
      },
    });
  }, [navigation]);

  const addart = () => {
    navigation.navigate('newOeuvre', {});
  };

  return (
    <View style={style.ecran}>
      <GestureHandlerRootView>
      <TouchableHighlight onPress={addart} style={style.new}>
            <Text style={style.tnew}>
              Ajouter une oeuvre
            </Text>
          </TouchableHighlight>
        {isLoading ? (
          <Text>Chargement en cours...</Text>
        ) : (
          <FlatList
            style={style.flat}
            data={etudiants}
            renderItem={function({ item }) {
              return (
                <View style={{ flexDirection : "row" , padding : 5 , alignSelf : "center"}}>
                  <TouchableHighlight onPress={() => handleButtonClick(item)} style={[style.btn]}>
                    <View style={[style.viewimg]}>
                      <Image
                        source={{ uri: item.adresse, width: 100, height: 100 }}
                        style={style.img}
                      />
                      <View style={style.align}>
                        <Text style={style.text}>nom : {item.nom}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            }}
          />
        )}
        {etudiants.length === 0 ? (
          <Text>Vous n'avez aucune oeuvre à votre nom.</Text>
        ) : null}
      </GestureHandlerRootView>
    </View>
  );
};

export default Dashboard;

const style = StyleSheet.create({
  tnew : {
    fontSize: 21,
    color: 'black',
    textAlign : 'center',
  },
  new : {
    alignSelf:'center',
    backgroundColor : "green",
    borderRadius : 20,
    padding : 20,
    fontSize : 30,
    width : 350,
  },
  flat: {
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  ecran: {
    marginBottom: 50,
  },
  align: {
    flexDirection: 'column',
  },
  btn: {
    backgroundColor: '#BBBEEC',
    padding: 30,
    margin: 10,
    width: 350,
    borderRadius: 30,
    TouchableHighlight: '#878BC4',
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
    backgroundColor: 'transparent',
    margin: 20,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});