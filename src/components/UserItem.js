// Hansel Hernandez - _gishikoDev

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserItem({ user, onEdit, onDelete }) {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.name}>{user.nome}</Text>
        <Text style={styles.text}>{user.telefone}</Text>
        <Text style={styles.text}>{user.cpf}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Editar a</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Excluir </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#313244',
    borderRadius: 8,
  },
  info: { flex: 1 },
  actions: { justifyContent: 'center' },
  name: { fontWeight: 'bold', fontSize: 16, color: '#f8f8f2' },
  text: { color: '#f8f8f2' },
  edit: { color: '#bd93f9', marginBottom: 4 },
  delete: { color: '#ff5555' },
});
