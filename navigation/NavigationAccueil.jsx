import Accueil from '../composants/Accueil';
import Profil from '../composants/Profil';
import Login from '../composants/Login';
import Dashboard from '../composants/Dashboard';
import Infos from '../composants/Infos';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  Creation from '../composants/creation';
import Oeuvre from '../composants/Oeuvre';
import NewOeuvre from '../composants/NewOeuvre';

const Stack = createNativeStackNavigator()

function NavigationAccueil() {
    return ( <Stack.Navigator>
        <Stack.Screen component={Accueil} name="Galerie"/>
        <Stack.Screen component={Login} name="login"/>
        <Stack.Screen component={Dashboard} name="dashboard"/>
        <Stack.Screen component={Creation} name='Creation'/>
        <Stack.Screen component={Infos} name='infos'/>
        <Stack.Screen component={Oeuvre} name='oeuvre'/>
        <Stack.Screen component={NewOeuvre} name='newOeuvre'/>
      </Stack.Navigator> );
}

export default NavigationAccueil;