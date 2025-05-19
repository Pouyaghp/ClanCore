import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';

interface Event {
  id?: string;
  title: string;
  date: string;
  description: string;
}

export default function DashboardScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Event),
      }));
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!title || !date || !description) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), { title, date, description });
      Alert.alert('Success', 'Event added!');
      setTitle('');
      setDate('');
      setDescription('');
      fetchEvents(); // Refresh event list
    } catch (error) {
      Alert.alert('Error', 'Failed to add event');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>

      <Text style={styles.header}>Clan Dashboard</Text>

      {/* Event Creation Form */}
      <TextInput
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Create Event" onPress={handleAddEvent} />

      <Text style={styles.subheader}>Clan Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  subheader: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 12,
    fontWeight: '600',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    color: '#000',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
  },
});
