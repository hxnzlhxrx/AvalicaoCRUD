// Hansel Hernandez - _gishikoDev

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadUsers();
    }
  }, [isFocused]);

  const loadUsers = async () => {
    const data = await AsyncStorage.getItem('@usuarios');
    if (data) setUsers(JSON.parse(data));
  };

  const deleteUser = async (cpf) => {
    const filtered = users.filter(user => user.cpf !== cpf);
    setUsers(filtered);
    await AsyncStorage.setItem('@usuarios', JSON.stringify(filtered));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@logado');
    navigation.replace('LoginScreen'); // volta para tela de login
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.text}>{item.telefone}</Text>
        <Text style={styles.text}>{item.cpf}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('UserForm', { user: item })}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteUser(item.cpf)}>
          <Text style={styles.delete}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#282a36" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')} 
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Lista de Usuários</Text>
        <Text style={styles.title}>Pressione + para adicionar</Text>

        <FlatList
          data={users}
          keyExtractor={item => item.cpf}
          renderItem={renderItem}
        />

        {/* Botão adicionar usuário */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('UserForm')}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        {/* Botão sair */}
        <TouchableHighlight
          style={styles.logoutButton}
          underlayColor="#ff4444"
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableHighlight>

        <Text style={styles.footer}>O futuro se programa hoje! - _gishikoDev </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#282a36',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#282a36'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1fa8c',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#44475a',
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  actions: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f8f8f2',
  },
  text: {
    color: '#f8f8f2',
  },
  edit: {
    color: '#bd93f9',
    marginBottom: 4,
  },
  delete: {
    color: '#ff5555',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#8be9fd',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#282a36',
    fontSize: 30,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#ff5555',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#f8f8f2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo:{
    height: 80,
    width: 80,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    color: 'gray',
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  }
});
