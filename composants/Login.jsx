  import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, TouchableHighlight } from 'react-native';
  import React, { useState } from 'react';
  import { schemaEtudiant } from '../Verif/etudiant';
  import db from "../config";
  import { collection, getDocs, query, where } from "firebase/firestore";

  function Login({ navigation }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [erreurs, setErreurs] = useState([]);

    const connect = async () => {
      const users = { login , password , statut : "user"}
      const { error } = schemaEtudiant.validate( users , {abortEarly : false}); 
        // effectuer les 11 verifications 
        console.log(error); 
        setErreurs([]);
      if(!error){
        const q = query(collection(db, "users"), where("login", "==", users.login));

         const querySnapshot =  await getDocs(q)
         const test = [] ;
         
         if(test.length > 0){
             setErreurs(["attention login est déjà utilisé"])
             return ;
         }  
        if (login === "") {
          setErreurs(["Veuillez saisir un login."]);
          return;
        }
        if (password === "") {
          setErreurs(["Veuillez saisir un mot de passe."]);
          return;
        }
        if (querySnapshot.empty) {
          setErreurs(["Le login ou le mot de passe est incorrect."]);
          return;
        }
        querySnapshot.forEach((doc) => {
          test.push(doc.id)
          console.log(password);
          console.log(doc.data().password);
          if (doc.data().password === password){
            setLogin("")
            setPassword("")
            navigation.navigate('dashboard', {login : login});
          }
      })
        
      }else {
        const tableauErreurs = error.details.map(function(item){ return item.message });
        setErreurs(tableauErreurs);
      }    
    }
      

    const createacount = () => {
      navigation.navigate('Creation', {login : login});
    };

    return (
      <View>
        <View style={style.card}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087592.png', width: 150, height: 150 }} />
          <TextInput
            placeholder="login"
            style={style.input}
            value={login}
            onChangeText={function (text) { setLogin(text); setErreurs([]); }}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={style.input}
            value={password}
            onChangeText={function (text) { setPassword(text); setErreurs([]); }}
          />
          <FlatList 
              data={erreurs}
              renderItem={function({item}){ return <Text>{item}</Text> }}
              
            /> 
          <TouchableHighlight onPress={connect} style={style.btcnx}>
            <Text style={style.txtcnx}>
              CONNEXION
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={createacount} style={style.newcpt}>
            <Text style={style.newtxt}>
              Créer un compte
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  export default Login;

  const style = StyleSheet.create({
    input: {
      borderWidth: 2,
      borderColor: "black",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: 200,
      marginVertical: 20,
    },
    card: {
      alignItems: "center",
      backgroundColor: "#28757f",
      borderRadius: 20,
      marginTop: 30,
      margin: 20,
      padding: 15,
    },
    img: {
      borderRadius: 50,
    },
    newcpt: {
      alignContent: "center",
      margin: 10,
    },
    newtxt: {
      textDecorationLine: "underline",
      fontSize: 17
    },
    txtcnx: {
      fontSize: 20,
      backgroundColor: "#00264d",
      padding: 10,
      color: 'white',
      borderRadius: 20
    },
    btcnx: {
      marginTop: 25
    }
  });
