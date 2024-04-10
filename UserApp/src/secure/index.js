import * as SecureStore from 'expo-secure-store';

async function storeToken(token) {
    await SecureStore.setItemAsync('userToken', token);
}

async function getToken() {
    return await SecureStore.getItemAsync('userToken');
}

async function deleteToken() {  
    await SecureStore.deleteItemAsync('userToken');
}

export default {
    storeToken,
    getToken,
    deleteToken
}