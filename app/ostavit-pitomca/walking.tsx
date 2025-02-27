import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

export default function WalkForm() {
  const router = useRouter();
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [interval, setInterval] = useState('');
  const [walkDuration, setWalkDuration] = useState(30); // Дефолтное значение 30 мин
  const [additionalInfo, setAdditionalInfo] = useState('');
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const durationSheetRef = useRef<ActionSheetRef>(null);

  const selectTimesPerDay = (num: number) => {
    setTimesPerDay(num);
    if (num === 1) setInterval(''); // Очищаем промежуток, если 1 раз
    actionSheetRef.current?.hide();
  };

  const selectWalkDuration = (duration: number) => {
    setWalkDuration(duration);
    durationSheetRef.current?.hide();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Выгул</Text>

      {/* Количество прогулок */}
      <Text style={styles.label}>Кол-во раз за день</Text>
      <TouchableOpacity style={styles.selector} onPress={() => actionSheetRef.current?.show()}>
        <Text style={styles.selectorText}>{timesPerDay} {timesPerDay === 1 ? 'раз' : 'раза'}</Text>
      </TouchableOpacity>

      {/* Поле промежутка между прогулками показывается только если выбрано больше 1 раза */}
      {timesPerDay > 1 && (
        <>
          <Text style={styles.label}>Промежуток между прогулками</Text>
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>
              {interval || 'Например: Утром и вечером'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Длительность прогулки */}
      <Text style={styles.label}>Длительность прогулки</Text>
      <TouchableOpacity style={styles.selector} onPress={() => durationSheetRef.current?.show()}>
        <Text style={styles.selectorText}>{walkDuration} минут</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Дополнительная информация</Text>
      <TouchableOpacity style={styles.input}>
        <Text style={styles.inputText}>
          {additionalInfo || 'Например: Нужно играть, избегать собак'}
        </Text>
      </TouchableOpacity>

      <Button mode="contained" onPress={() => alert('Форма отправлена!')} style={styles.submitButton}>
        Сохранить
      </Button>

      <Button mode="outlined" onPress={() => router.push("/ostavit-pitomca/Service")} style={styles.backButton} labelStyle={styles.backText}>
        Назад
      </Button>

      {/* ActionSheet для выбора количества прогулок */}
      <ActionSheet ref={actionSheetRef} containerStyle={styles.sheetContainer}>
        <View>
          {[1, 2, 3, 4].map((num) => (
            <TouchableOpacity key={num} style={styles.option} onPress={() => selectTimesPerDay(num)}>
              <Text style={styles.optionText}>{num} {num === 1 ? 'раз' : 'раза'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheet>

      {/* ActionSheet для выбора длительности прогулки */}
      <ActionSheet ref={durationSheetRef} containerStyle={styles.sheetContainer}>
        <View>
          {[10, 20, 30, 60].map((duration) => (
            <TouchableOpacity key={duration} style={styles.option} onPress={() => selectWalkDuration(duration)}>
              <Text style={styles.optionText}>{duration} минут</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 15,
  },
  inputText: {
    color: '#AAAAAA',
    fontSize: 16,
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
