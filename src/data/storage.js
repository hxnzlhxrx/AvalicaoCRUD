// Hansel Hernandez - _gishikoDev

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@usuarios';

export async function getUsers() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export async function saveUsers(users) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
}
