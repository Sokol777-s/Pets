import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function WalkForm() {
  const router = useRouter();
  const [timesPerDay, setTimesPerDay] = useState('');
  const [interval, setInterval] = useState('');
  const [walkDuration, setWalkDuration] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Выгул</Text>

      <Text style={styles.label}>Кол-во раз за день</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: 2 раза"
        placeholderTextColor="#AAAAAA"
        value={timesPerDay}
        onChangeText={setTimesPerDay}
      />

      <Text style={styles.label}>Промежуток между прогулками</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: Утром и вечером"
        placeholderTextColor="#AAAAAA"
        value={interval}
        onChangeText={setInterval}
      />

      <Text style={styles.label}>Длительность прогулки</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: 30 минут"
        placeholderTextColor="#AAAAAA"
        value={walkDuration}
        onChangeText={setWalkDuration}
      />

      <Text style={styles.label}>Дополнительная информация</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: Нужно играть, избегать собак"
        placeholderTextColor="#AAAAAA"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />

      <Button mode="contained" onPress={() => alert('Форма отправлена!')} style={styles.submitButton}>
        Сохранить
      </Button>

      <Button mode="outlined" onPress={() => router.back()} style={styles.backButton} labelStyle={styles.backText}>
        Назад
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButton: {
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 15,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  backText: {
    color: '#FFA500',
    fontSize: 16,
  },
});
