import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';

import HomePage from '../pages/Home/HomePage/';
import Search from '../pages/Home/Search/';
import Schedules from '../pages/Home/Schedules/';
import ProfileScreen from '../pages/Home/Profile/';
import EditProfileScreen from '../pages/Home/ProfileRoutes/EditProfile/';
import PersonalInfoScreen from '../pages/Home/ProfileRoutes/EditPersonalPage/';
import AccessInfoScreen from '../pages/Home/ProfileRoutes/EditAccessPage';
import EditDataPage from '../pages/Home/ProfileRoutes/EditDataPage';
import SupportScreen from '../pages/Home/ProfileRoutes/SupportPage';
import ShareScreen from '../pages/Home/ProfileRoutes/SharePage';
import FavoriteScreen from '../pages/Home/ProfileRoutes/FavoritePage';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getToken } from '../secure/GetToken';
import axios from 'axios';
import baseURL from '../apis/UserAuth';
import { deleteToken } from '../secure/DeleteToken';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    const StackAuth = () => {
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
                    component={TabsHome}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    };

    const StackProfile = ({ navigation }) => {

        const logOut = async () => {
            try {
                const token = await getToken();

                const { data } = await axios.post(
                    baseURL + `/logout/`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if ( data.message.success ) {
                    await deleteToken()
                    navigation.navigate('Login')
                }
            } catch (error) {
                console.error(`Erro: ${error}`);
            }
        };

        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#f2f2f2",
                        shadowColor: "#FFF",
                        elevation: 0,
                        borderBottomWidth: 0,
                    },
                    headerTintColor: "#4f297a",
                }}
            >
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        title: '',
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="logout"
                                    size={25}
                                    backgroundColor={"#f2f2f2"}
                                    color={"#4f297a"}
                                    onPress={logOut}
                                />
                            </View>
                        ),
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    options={{
                        title: 'Editar Perfil',
                        headerTitleAlign: 'center',
                        tabBarVisible: false,
                    }}
                    component={EditProfileScreen}
                />
                <Stack.Screen
                    name="PersonalInfo"
                    options={{
                        title: 'Informações Pessoais',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons.Button
                                    name="arrow-back"
                                    size={25}
                                    color={"#4f297a"}
                                    backgroundColor={"#f2f2f2"}
                                    onPress={() => {
                                        navigation.setOptions({
                                            tabBarStyle: {
                                                position: 'absolute',
                                                backgroundColor: '#4f297a',
                                                borderTopWidth: 0,
                                                elevation: 0,
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                                height: 70
                                            },
                                        });
                                        navigation.navigate('EditProfile');
                                    }}
                                />
                            </View>
                        ),
                    }}
                    component={PersonalInfoScreen}
                />
                <Stack.Screen
                    name="AccessInfo"
                    options={{
                        title: 'Informações de Acesso',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons.Button
                                    name="arrow-back"
                                    size={25}
                                    color={"#4f297a"}
                                    backgroundColor={"#f2f2f2"}
                                    onPress={() => {
                                        navigation.setOptions({
                                            tabBarStyle: {
                                                position: 'absolute',
                                                backgroundColor: '#4f297a',
                                                borderTopWidth: 0,
                                                elevation: 0,
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                                height: 70
                                            },
                                        });
                                        navigation.navigate('EditProfile');
                                    }}
                                />
                            </View>
                        ),
                    }}
                    component={AccessInfoScreen}
                />
                <Stack.Screen
                    name="EditDataScreen"
                    options={{
                        title: '',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons.Button
                                    name="arrow-back"
                                    size={25}
                                    color={"#4f297a"}
                                    backgroundColor={"#f2f2f2"}
                                    onPress={() => {
                                        navigation.setOptions({
                                            tabBarStyle: {
                                                position: 'absolute',
                                                backgroundColor: '#4f297a',
                                                borderTopWidth: 0,
                                                elevation: 0,
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                                height: 70
                                            },
                                        });
                                        navigation.navigate('AccessInfo');
                                    }}
                                />
                            </View>
                        ),
                    }}
                    component={EditDataPage}
                /** Fim do Stack de Edição de Perfil */
                />
                <Stack.Screen
                    /** Inicio Stack Suport */
                    name="SuportScreen"
                    options={{
                        title: 'AJUDA',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons.Button
                                    name="arrow-back"
                                    size={25}
                                    color={"#4f297a"}
                                    backgroundColor={"#f2f2f2"}
                                    onPress={() => {
                                        navigation.setOptions({
                                            tabBarStyle: {
                                                position: 'absolute',
                                                backgroundColor: '#4f297a',
                                                borderTopWidth: 0,
                                                elevation: 0,
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                                height: 70
                                            },
                                        });
                                        navigation.navigate('ProfileScreen');
                                    }}
                                />
                            </View>
                        ),
                    }}
                    component={SupportScreen}
                />


                <Stack.Screen
                    /** Inicio Stack Compartilhar */
                    name="ShareScreen"
                    options={{
                        title: ' COMPARTILHAR ',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons.Button
                                    name="arrow-back"
                                    size={25}
                                    color={"#4f297a"}
                                    backgroundColor={"#f2f2f2"}
                                    onPress={() => {
                                        navigation.setOptions({
                                            tabBarStyle: {
                                                position: 'absolute',
                                                backgroundColor: '#4f297a',
                                                borderTopWidth: 0,
                                                elevation: 0,
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                                height: 70
                                            },
                                        });
                                        navigation.navigate('ProfileScreen');
                                    }}
                                />
                            </View>
                        ),
                    }}
                    component={ShareScreen}
                />

                <Stack.Screen
                    /** Inicio Stack Favoritos */
                    name="FavoriteScreen"
                    options={{
                        title: ' FAVORITOS ',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons.Button
                                    name="arrow-back"
                                    size={25}
                                    color={"#4f297a"}
                                    backgroundColor={"#f2f2f2"}
                                    onPress={() => {
                                        navigation.setOptions({
                                            tabBarStyle: {
                                                position: 'absolute',
                                                backgroundColor: '#4f297a',
                                                borderTopWidth: 0,
                                                elevation: 0,
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                                height: 70
                                            },
                                        });
                                        navigation.navigate('ProfileScreen');
                                    }}
                                />
                            </View>
                        ),
                    }}
                    component={FavoriteScreen}
                />
            </Stack.Navigator>
        );
    }

    const TabsHome = () => {
        return (
            <Tab.Navigator
                screenOptions={() => ({
                    tabBarVisible: true,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: '#4f297a',
                        borderTopWidth: 0,
                        elevation: 0,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        height: 70
                    },
                })}
            >
                <Tab.Screen
                    name='HomePage'
                    component={HomePage}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            focused ?
                                <Ionicons name='home' size={30} color={'#FFF'} /> :
                                <Ionicons name='home-outline' size={size} color={'#FFF'} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Search'
                    component={Search}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            focused ?
                                <Ionicons name='search' size={30} color={'#FFF'} /> :
                                <Ionicons name='search-outline' size={size} color={'#FFF'} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Schedules'
                    component={Schedules}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            focused ?
                                <Ionicons name='calendar-number' size={30} color={'#FFF'} /> :
                                <Ionicons name='calendar-number-outline' size={size} color={'#FFF'} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={StackProfile}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            focused ?
                                <Ionicons name='person' size={30} color={'#FFF'} /> :
                                <Ionicons name='person-outline' size={size} color={'#FFF'} />
                        )
                    }}
                />
            </Tab.Navigator>
        );
    };

    return (
        <StackAuth />
    );
}