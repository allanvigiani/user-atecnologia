import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{ headerShown: false }}
            />
                        
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Register'
                component={Register}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}