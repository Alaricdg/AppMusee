import { Text , View, Image , StyleSheet } from "react-native"

function Profil() {
    return ( <View style={style.card} >
    <View style={style.zoneGauche}>
        <View style={style.zoneGaucheTop}>
            <Image source={{ uri : "http://via.placeholder.com/50x50" , width:50, height: 50 }}  style={style.img}/>
            <View style={style.zoneGaucheNom}>
                <Text style={[style.h2, style.textWhite]}>Prénom Nom</Text>
                <Text style={[style.h3, style.textWhite]}>description</Text>
            </View>
        </View>
        <View style={style.zoneGaucheBottom}>
            <View style={style.zoneGaucheSocial}>
                <Text style={[style.number , style.center, style.textWhite]}>2222</Text>
                <Text style={[style.text , style.center , style.textWhite]}>Lorem.</Text>
            </View>
            <View style={style.zoneGaucheSocial}>
                <Text style={[style.number , style.center, style.textWhite]}>2222</Text>
                <Text style={[style.text , style.center , style.textWhite]}>Lorem.</Text>
            </View>
            <View style={style.zoneGaucheSocial}>
                <Text style={[style.number , style.center, style.textWhite]}>2222</Text>
                <Text style={[style.text , style.center , style.textWhite]}>Lorem.</Text>
            </View>
        </View>
    </View>
    <View style={style.zoneDroite}>
        <View style={style.zoneDroiteTop}>
            <Text style={[style.text , style.center , style.mb30]}>...</Text>
        </View>
        <View style={style.zoneDroiteMiddle}>
            <Text style={[style.number , style.center]}>1</Text>
            <Text style={[style.text , style.center]}>Ranking</Text>
        </View>
    </View>
</View> )
}

export default Profil ;

const style = StyleSheet.create({
    mb30: {
        marginBottom : 30
    },
    textWhite : {
        color : "white"
    },
    center : {
        textAlign : "center"
    },
    card : {
        backgroundColor: "#aaa",
        margin: 20,
        padding: 10, 
        flexDirection : "row", 
        borderRadius: 15,
        color:"white",
        fontFamily: "sans-serif"
    },
    zoneGauche :{
        flex: 3,
        marginRight : 20
    },
    zoneDroite :{
        flex: 1,
    },
    zoneGaucheTop :{
        alignItems: "center",
        flexDirection : "row"
    },
    img :{
        marginRight: 10,
        borderRadius: 50,
    },
    h2 :{
        fontSize: 18,
    },
    h3 :{
        fontSize: 14,
        marginBottom: 18,
    },
    zoneGaucheBottom :{
        flexDirection : "row", 
        justifyContent: "flex-end",
    },
    zoneGaucheSocial :{
        marginLeft: 10,
        textAlign: "center",
        justifyContent : "center"
    },
    zoneDroiteTop :{
        fontSize: 40,
        lineHeight: 10,
    },
    zoneDroiteMiddle :{
        textAlign:"center"
    },
    zoneDroiteMiddle : {
        fontSize: 24,
    }

})