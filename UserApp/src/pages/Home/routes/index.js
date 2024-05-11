import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native-animatable';

import HomePage from '../HomePage';
import Search from '../Search';
import Schedules from '../Schedules';
import ProfileScreen from '../Profile';
import EditProfileScreen from '../ProfileRoutes/EditProfile';
import PersonalInfoScreen from '../ProfileRoutes/EditPersonalPage';
import AccessInfoScreen from '../ProfileRoutes/EditAccessPage';
import EditDataPage from '../ProfileRoutes/EditDataPage';
import SupportScreen from '../ProfileRoutes/SupportPage';
import ShareScreen from '../ProfileRoutes/SharePage';
import FavoriteScreen from '../ProfileRoutes/FavoritePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {

    const StackProfile = ({ navigation }) => {
        return (
            /** Inicio do Stack de Edição de Perfil */
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
                                    onPress={() => navigateToScreen('Profile')}
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
                                <Icon.Button
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
                                <Icon.Button
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
                                <Icon.Button
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
                                <Icon.Button
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
                                <Icon.Button
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
                            <Icon.Button
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
        <TabsHome />
    );
}
