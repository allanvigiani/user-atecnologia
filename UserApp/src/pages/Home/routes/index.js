import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomePage from '../HomePage';
import Search from '../Search';
import Schedules from '../Schedules';
import Profile from '../Profile';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
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
            }}
        >
            <Tab.Screen
                name='HomePage'
                component={HomePage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <Ionicons
                                name='home' 
                                size={30}
                                color={'#FFF'}
                            />
                        }

                        return <Ionicons
                        name='home-outline' 
                        size={size}
                        color={'#FFF'}
                    />
                    }
                }}
            />

            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <Ionicons
                                name='search' 
                                size={30}
                                color={'#FFF'}
                            />
                        }

                        return <Ionicons
                        name='search-outline' 
                        size={size}
                        color={'#FFF'}
                    />
                    }
                }}
            />

            <Tab.Screen
                name='Schedules'
                component={Schedules}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <Ionicons
                                name='calendar-number' 
                                size={30}
                                color={'#FFF'}
                            />
                        }

                        return <Ionicons
                        name='calendar-number-outline' 
                        size={size}
                        color={'#FFF'}
                    />
                    }
                }}
            />

            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <Ionicons
                                name='person' 
                                size={30}
                                color={'#FFF'}
                            />
                        }

                        return <Ionicons
                        name='person-outline' 
                        size={size}
                        color={'#FFF'}
                    />
                    }
                }}
            />
        </Tab.Navigator>
    )
}