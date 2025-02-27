import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

export default function PetCareForm() {
  const router = useRouter();
  const [duration, setDuration] = useState('1 день');
  const [provideFood, setProvideFood] = useState('yes');
  const [food, setFood] = useState('');
  const [feedTimes, setFeedTimes] = useState('1 раз');
  const [walkTimes, setWalkTimes] = useState('1 раз');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [contact, setContact] = useState('+7');

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const feedSheetRef = useRef<ActionSheetRef>(null);
  const walkSheetRef = useRef<ActionSheetRef>(null);

  // Форматируем дни
  const formatDays = (num: number) => (num === 1 ? '1 день' : `${num} дней`);

  // Форматируем количество раз
  const formatTimes = (num: number) => `${num} ${num === 1 ? 'раз' : 'раза'}`;
   

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Передержка</Text>

      {/* Срок передержки */}
      <Text style={styles.label}>Срок на который нужно оставить</Text>
      <TouchableOpacity style={styles.selector} onPress={() => actionSheetRef.current?.show()}>
        <Text style={styles.selectorText}>{duration}</Text>
      </TouchableOpacity>

      {/* Предоставите ли вы корм? */}
      <Text style={styles.label}>Предоставите ли вы корм?</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity style={styles.radioOption} onPress={() => setProvideFood('yes')}>
          <RadioButton value="yes" status={provideFood === 'yes' ? 'checked' : 'unchecked'} onPress={() => setProvideFood('yes')} color="#FFA500" />
          <Text style={styles.radioText}>Да</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioOption} onPress={() => setProvideFood('no')}>
          <RadioButton value="no" status={provideFood === 'no' ? 'checked' : 'unchecked'} onPress={() => setProvideFood('no')} color="#FFA500" />
          <Text style={styles.radioText}>Нет</Text>
        </TouchableOpacity>
      </View>

      {/* Поле ввода корма */}
      {provideFood === 'no' && (
        <TextInput style={styles.input} placeholder="Чем кормить? : Сухой корм, натуралка" placeholderTextColor="#AAAAAA" value={food} onChangeText={setFood} />
      )}

      {/* Сколько раз в день кормить */}
      <Text style={styles.label}>Сколько раз в день кормить?</Text>
      <TouchableOpacity style={styles.selector} onPress={() => feedSheetRef.current?.show()}>
        <Text style={styles.selectorText}>{feedTimes}</Text>
      </TouchableOpacity>

      {/* Сколько раз в день гулять */}
      <Text style={styles.label}>Сколько раз в день гулять?</Text>
      <TouchableOpacity style={styles.selector} onPress={() => walkSheetRef.current?.show()}>
        <Text style={styles.selectorText}>{walkTimes}</Text>
      </TouchableOpacity>

      {/* Особые требования */}
      <Text style={styles.label}>Особые требования</Text>
      <TextInput style={styles.input} placeholder="Например: Приём лекарств, аллергии" placeholderTextColor="#AAAAAA" value={specialNeeds} onChangeText={setSpecialNeeds} />

      {/* Контакт */}
      <Text style={styles.label}>Контакт для связи</Text>
      <TextInput
        style={styles.input}
        placeholder="+7XXXXXXXXXX"
        placeholderTextColor="#AAAAAA"
        value={contact}
        onChangeText={(text) => {
          if (!text.startsWith('+7')) {
            setContact('+7');
          } else {
            setContact(text.replace(/[^+\d]/g, '').slice(0, 12));
          }
        }}
        keyboardType="phone-pad"
        maxLength={12}
      />

      {/* Кнопки */}
      <Button mode="contained" onPress={() => alert('Форма отправлена!')} style={styles.submitButton}>
        Сохранить
      </Button>

      <Button mode="outlined" onPress={() => router.push("/ostavit-pitomca/Service")} style={styles.backButton} labelStyle={styles.backText}>
        Назад
      </Button>

      {/* ActionSheet для срока */}
      <ActionSheet ref={actionSheetRef} containerStyle={styles.sheetContainer}>
        <ScrollView style={styles.scrollSheet}>
          {[...Array(30).keys()].map((num) => (
            <TouchableOpacity key={num + 1} style={styles.option} onPress={() => { setDuration(formatDays(num + 1)); actionSheetRef.current?.hide(); }}>
              <Text style={styles.optionText}>{formatDays(num + 1)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ActionSheet>

      {/* ActionSheet для кормления */}
      <ActionSheet ref={feedSheetRef} containerStyle={styles.sheetContainer}>
        <ScrollView style={styles.scrollSheet}>
          {[...Array(5).keys()].map((num) => (
            <TouchableOpacity key={num + 1} style={styles.option} onPress={() => { setFeedTimes(formatTimes(num + 1)); feedSheetRef.current?.hide(); }}>
              <Text style={styles.optionText}>{formatTimes(num + 1)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ActionSheet>

      {/* ActionSheet для прогулок */}
      <ActionSheet ref={walkSheetRef} containerStyle={styles.sheetContainer}>
        <ScrollView style={styles.scrollSheet}>
          {[...Array(5).keys()].map((num) => (
            <TouchableOpacity key={num + 1} style={styles.option} onPress={() => { setWalkTimes(formatTimes(num + 1)); walkSheetRef.current?.hide(); }}>
              <Text style={styles.optionText}>{formatTimes(num + 1)}</Text>
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
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
    maxHeight: 400,
  },
  scrollSheet: {
    maxHeight: 350,
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
