import * as SecureStore from 'expo-secure-store';

export const deleteUserId = async () => {
    await SecureStore.deleteItemAsync('userId');
};