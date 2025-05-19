import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function CreateEventScreen() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!title || !date || !description) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        date,
        description,
        createdAt: new Date().toISOString()
      });
      Alert.alert('Success', 'Event added!');
      router.replace('/dashboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to add event. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Event</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Date (e.g., 2025-06-01)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});
