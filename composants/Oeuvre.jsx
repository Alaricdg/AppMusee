import { StyleSheet, Text, View , Image, TextInput, Button , FlatList } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaOeuvres }  from "../Verif/oeuvres.jsx"
import db from "../config"
import {  getDoc, updateDoc , doc  ,deleteDoc } from "firebase/firestore"



const Oeuvre = ({ route , navigation}) => {
  
  const [id, setId]= useState("");
  const [nom, setNom]= useState("");
  const [description, setDescrition]= useState("");
  const [adresse, setAdresse]= useState("");
  const item = route.params.item;
  const [updateList , setUpdateList] = useState(false); 
  const [erreurs, setErreurs]= useState([]);

  useEffect( function(){
    console.log(item.nom)
    const id = item.id;
    setId(id);
    getDoc(doc(db , "oeuvres", id)).then(function(snapShot){
        const {description , nom , adresse} = snapShot.data()
        setNom(nom); 
        setDescrition(description);
        setAdresse(adresse);
    })
} , [])

const handleSubmit = async () => {
       
  const oeuvre = { nom , description , adresse }
  const { error } = schemaOeuvres.validate( oeuvre , {abortEarly : false}); 
  setErreurs([]);
  if(!error){
      
      await updateDoc(doc(db, "oeuvre" , id) , oeuvre)
      navigation.push('oeuvre') ;
       
  }else {
      console.log("erreur")
      const tableauErreurs = error.details.map(function(item){ return item.message });
      setErreurs(tableauErreurs);
  }

}

  const supprimer = (id) => {
    deleteDoc(doc(db , "oeuvres" , id)).then(function(){
        setUpdateList(!updateList);
        navigation.push('oeuvre')
    });
}

return (

  <View>
    <View style={style.logos}>
      <Button onPress={function () { supprimer(item.id) }} color="red" title="supprimer" />
      <Button onPress={handleSubmit} color="green" title="valider les modifications" />
    </View>
    <View style={style.card}>
      <Image style={style.image} source={{ uri: item.adresse, width: 200, height: 200 }} />
      <Text style={style.text}>Nom : </Text>
      <TextInput
        onChangeText={(text) => { setNom(text); setErreurs([]); }}
        value={nom}
        style={style.input}
      />
      <Text style={style.text}>Description : </Text>
      <TextInput
        onChangeText={(text) => { setDescription(text); setErreurs([]); }}
        value={description}
        style={style.input}
      />
      <Text style={style.text}>Adresse :</Text>
      <TextInput
        onChangeText={(text) => { setAdresse(text); setErreurs([]); }}
        value={adresse}
        style={style.input}
      />
      <FlatList
        data={erreurs}
        renderItem={(item) => <Text>{item}</Text>}
      />
    </View>
  </View>
);
};
export default Oeuvre;

const style = StyleSheet.create({
  logos : {
    flexDirection : 'row',
    alignSelf :'flex-start',
    margin : 20
  },
  supr : {
    marginRight : 245,
    marginLeft : 20,
    margin : 5
  },
  valide : {
    marginRight : 20,
    margin : 5

  },
  input : {
    borderWidth : 1,
    borderColor : 'black',
    padding : 5,
    fontSize : 20,
  },
  card: {
    backgroundColor: "#93A2D5",
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