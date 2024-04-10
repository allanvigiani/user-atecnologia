import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

export default function Home() {
    return (
        <NavigationContainer independent={true} >
            <StatusBar backgroundColor='#4f297a'/>
            <Routes/>
        </NavigationContainer>
    );
}
