// Hansel Hernandez - _gishikoDev

import React, { useState, useEffect } from "react";
import { View, TextInput, Alert, ScrollView, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserForm({ route, navigation }) {
  const [user, setUser] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  useEffect(() => {
    if (route.params?.user) {
      setUser(route.params.user);
    }
  }, [route.params]);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });

    if (field === "cep" && value.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${value}/json/`)
        .then((response) => {
          const data = response.data;
          if (!data.erro) {
            setUser((prev) => ({
              ...prev,
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              uf: data.uf,
            }));
          } else {
            Alert.alert("CEP inválido");
          }
        })
        .catch(() => Alert.alert("Erro ao buscar CEP"));
    }
  };

  const saveUser = async () => {
    if (!user.nome || !user.cpf) {
      Alert.alert("Preencha os campos obrigatórios");
      return;
    }

    const data = await AsyncStorage.getItem("@usuarios");
    const users = data ? JSON.parse(data) : [];

    const index = users.findIndex((u) => u.cpf === user.cpf);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }

    await AsyncStorage.setItem("@usuarios", JSON.stringify(users));
    Alert.alert("Usuário salvo com sucesso");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#282a36" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Usuário</Text>

        {[
          "nome",
          "telefone",
          "cpf",
          "cep",
          "logradouro",
          "bairro",
          "cidade",
          "uf",
        ].map((field) => (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            placeholderTextColor="#6272a4"
            value={user[field]}
            onChangeText={(value) => handleChange(field, value)}
            keyboardType={
              field === "telefone" || field === "cep" || field === "cpf"
                ? "numeric"
                : "default"
            }
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={saveUser}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>
          O futuro se programa hoje! - _gishikoDev{" "}
        </Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#282a36",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1fa8c",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6272a4",
    backgroundColor: "#44475a",
    color: "#f8f8f2",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#50fa7b",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#282a36",
    fontWeight: "bold",
    fontSize: 16,
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
    color: "gray",
    fontSize: 10,
    fontStyle: "italic",
    marginTop: 16,
    textAlign: "center",
  },
});
