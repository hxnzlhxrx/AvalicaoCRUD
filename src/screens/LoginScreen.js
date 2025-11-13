// Hansel Hernandez - _gishikoDev

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Image, ToastAndroid, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message); // fallback para iOS
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      showToast('Preencha e-mail e senha!');
      return;
    }
    await AsyncStorage.setItem('@logado', 'true');
    navigation.replace('ListUsers');
  };

  const handleContinue = async () => {
    await AsyncStorage.setItem('@logado', 'true');
    navigation.replace('ListUsers');
  };

  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Bem-vindo ao App!</Text>
      </View>

      {/* Campo de e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#6272a4"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#6272a4"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Entrar */}
      <TouchableHighlight
        style={styles.button}
        underlayColor="#50fa7b"
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableHighlight>

      {/* Botão Continuar sem login */}
      <TouchableHighlight
        style={styles.secondaryButton}
        underlayColor="#8be9fd"
        onPress={handleContinue}
      >
        <Text style={styles.secondaryText}>Continuar sem login</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1fa8c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6272a4',
    backgroundColor: '#44475a',
    color: '#f8f8f2',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#50fa7b',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#282a36',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#8be9fd',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#282a36',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
