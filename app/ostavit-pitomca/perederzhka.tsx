import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function PetCareForm() {
  const router = useRouter();
  const [duration, setDuration] = useState('');
  const [food, setFood] = useState('');
  const [care, setCare] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [contact, setContact] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Перередержка</Text>

      <Text style={styles.label}>Срок на который нужно оставить</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: 3 дня, 1 неделя"
        placeholderTextColor="#AAAAAA"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={styles.label}>Чем кормить или корм предоставите</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: Сухой корм, натуралка"
        placeholderTextColor="#AAAAAA"
        value={food}
        onChangeText={setFood}
      />

      <Text style={styles.label}>Уход</Text>
      <TextInput
        style={styles.input}
        placeholder="Когда кормить, гулять"
        placeholderTextColor="#AAAAAA"
        value={care}
        onChangeText={setCare}
      />

      <Text style={styles.label}>Особые требования</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: Приём лекарств, аллергии"
        placeholderTextColor="#AAAAAA"
        value={specialNeeds}
        onChangeText={setSpecialNeeds}
      />

      <Text style={styles.label}>Контакт для связи</Text>
      <TextInput
        style={styles.input}
        placeholder="Ваш номер телефона"
        placeholderTextColor="#AAAAAA"
        value={contact}
        onChangeText={setContact}
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
