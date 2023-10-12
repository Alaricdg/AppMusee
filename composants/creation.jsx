import { StyleSheet, Text, View , Button , TextInput , FlatList , Image , TouchableHighlight} from 'react-native'
import React , {useState} from 'react'
import { schemaEtudiant } from '../Verif/etudiant'
import db from "../config"
import { collection , addDoc , getDocs , query, where } from "firebase/firestore"


const Creation = ({ navigation }  ) => {
  const [login, setLogin]= useState("");
  const [password, setPassword]= useState("");
  const [erreurs, setErreurs]= useState([]);

  const handleSubmit = async () => {
    const users = { login , password , statut : "user"}
    const { error } = schemaEtudiant.validate( users , {abortEarly : false}); 
        // effectuer les 11 verifications 
        console.log(error); 
        setErreurs([]);
        if(!error){ // si erreur est undefined 
          // ajouter dans Firebase 
          // ajouter une nouvelle ligne dans la table etudiant

          // vérifier si on a un utilisateur qui a déjà le même email que celui saisit
         const q = query(collection(db, "users"), where("login", "==", users.login));

         const querySnapshot =  await getDocs(q)
         const test = [] ;

         querySnapshot.forEach((doc) => {
             test.push(doc.id)
             console.log(doc.id, " => ", doc.data());
         })
         
         if(test.length > 0){
             setErreurs(["attention login est déjà utilisé"])
             return ;
         }   
          
         // ici on va pouvoir effecter l'ajout
         await addDoc(collection(db, "users") , users) ;
         setLogin("")
         setPassword("")
         alert("le profil utilisateur est bien créé en base de donnée")
         navigation.push('Galerie') ; 
        }else {
          const tableauErreurs = error.details.map(function(item){ return item.message });
          setErreurs(tableauErreurs);
      }
  };

  return (
      <View>
        <View style={style.card}>
          <Image source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087592.png', width: 150, height: 150 }}  />
          <TextInput
            placeholder="login"
            style={style.input}
            value={login}
            onChangeText={function(text){ setLogin(text) ; setErreurs([]);}}
            
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={style.input}
            value={password}
            onChangeText={function(text){ setPassword(text) ; setErreurs([]);}}
          />
          <FlatList 
            data={erreurs}
            renderItem={function({item}){ return <Text>{item}</Text> }}
          /> 
          <TouchableHighlight onPress={handleSubmit} style={style.btcnx}>
                <Text style={style.txtcnx}>
                    creer mon compte
                </Text>
            </TouchableHighlight>
        </View>
        
    </View>
  );
}
export default Creation


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
    marginTop: 10,
    margin: 20,
    padding: 15,
  },
  img: {
    borderRadius: 50,
  },
  newcpt : {
    alignContent: "center",
    margin : 10,
  },
  newtxt : {
    textDecorationLine :"underline",
    fontSize : 17
  },
  txtcnx : {
    fontSize : 20,
    backgroundColor : "#00264d",
    padding : 10,
    color : 'white',
    borderRadius : 20
  },
  btcnx : {
    marginTop : 25
  }
});
