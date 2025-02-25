import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

export default function PetCareForm() {
  const router = useRouter();
  const [duration, setDuration] = useState('1 день');
  const [food, setFood] = useState('');
  const [care, setCare] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [contact, setContact] = useState('');
  const actionSheetRef = useRef<ActionSheetRef>(null);

  // Форматируем дни
  const formatDays = (num: number) => {
    if (num === 1) return '1 день';
    if (num >= 2 && num <= 6) return `${num} дня`;
    return `${num} дней`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Передержка</Text>

      {/* Срок на который нужно оставить */}
      <Text style={styles.label}>Срок на который нужно оставить</Text>
      <TouchableOpacity style={styles.selector} onPress={() => actionSheetRef.current?.show()}>
        <Text style={styles.selectorText}>{duration}</Text>
      </TouchableOpacity>

      {/* Чем кормить */}
      <Text style={styles.label}>Чем кормить или корм предоставите</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: Сухой корм, натуралка"
        placeholderTextColor="#AAAAAA"
        value={food}
        onChangeText={setFood}
      />

      {/* Уход */}
      <Text style={styles.label}>Уход</Text>
      <TextInput
        style={styles.input}
        placeholder="Когда кормить, гулять"
        placeholderTextColor="#AAAAAA"
        value={care}
        onChangeText={setCare}
      />

      {/* Особые требования */}
      <Text style={styles.label}>Особые требования</Text>
      <TextInput
        style={styles.input}
        placeholder="Например: Приём лекарств, аллергии"
        placeholderTextColor="#AAAAAA"
        value={specialNeeds}
        onChangeText={setSpecialNeeds}
      />

      {/* Контакт */}
      <Text style={styles.label}>Контакт для связи</Text>
      <TextInput
        style={styles.input}
        placeholder="Ваш номер телефона"
        placeholderTextColor="#AAAAAA"
        value={contact}
        onChangeText={setContact}
      />

      {/* Кнопки */}
      <Button mode="contained" onPress={() => alert('Форма отправлена!')} style={styles.submitButton}>
        Сохранить
      </Button>

      <Button mode="outlined" onPress={() => router.back()} style={styles.backButton} labelStyle={styles.backText}>
        Назад
      </Button>

      {/* ActionSheet для выбора срока */}
      <ActionSheet ref={actionSheetRef} containerStyle={styles.sheetContainer}>
        <ScrollView style={styles.scrollSheet}>
          {[...Array(30).keys()].map((num) => (
            <TouchableOpacity
              key={num + 1}
              style={styles.option}
              onPress={() => {
                setDuration(formatDays(num + 1));
                actionSheetRef.current?.hide();
              }}
            >
              <Text style={styles.optionText}>{formatDays(num + 1)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ActionSheet>
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
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  selector: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectorText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  sheetContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    maxHeight: 400, // Ограничение высоты
  },
  scrollSheet: {
    maxHeight: 350, // Чтоб можно было скроллить
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFA500',
    fontSize: 18,
  },
});
