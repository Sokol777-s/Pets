import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function PetForm() {
  const router = useRouter();
  const [petType, setPetType] = useState('cat');
  const [petName, setPetName] = useState('');
  const [petInfo, setPetInfo] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validatePetName = (name: string) => {
    const nameRegex = /^[A-Za-zА-Яа-я]{2,}[0-9]{0,2}$/;
    return nameRegex.test(name);
  };

  const handleSubmit = () => {
    console.log('Кнопка сохранения нажата');
  
    if (!petType || !image || !petName) {
      setError('Все поля обязательны!');
      console.log('Ошибка: не все поля заполнены');
      return;
    }
  
    if (!validatePetName(petName)) {
      setError('Кличка должна содержать минимум 2 буквы и не более 2 цифр!');
      console.log('Ошибка: некорректное имя питомца');
      return;
    }
  
    if (petInfo.length > 100) {
      setError('Информация о питомце не должна превышать 100 символов!');
      console.log('Ошибка: информация слишком длинная');
      return;
    }
  
    setError('');
    console.log('Все проверки пройдены, выполняем переход на /ostavit-pitomca/Service');
  
    router.push('/ostavit-pitomca/Service');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заполнение анкеты питомца</Text>
      <View style={styles.formCard}>
        <Text style={styles.label}>Кличка питомца:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите кличку питомца"
          placeholderTextColor="#AAAAAA"
          value={petName}
          onChangeText={setPetName}
        />

        <Text style={styles.label}>Выбор вида:</Text>
        <RadioButton.Group onValueChange={setPetType} value={petType}>
          <View style={styles.radioRow}>
            <RadioButton value="cat" />
            <Text style={styles.radioLabel}>Кошка</Text>
            <RadioButton value="dog" />
            <Text style={styles.radioLabel}>Собака</Text>
          </View>
        </RadioButton.Group>

        <Text style={styles.label}>Информация о питомце:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите информацию (не более 100 символов)"
          placeholderTextColor="#AAAAAA"
          value={petInfo}
          onChangeText={setPetInfo}
          maxLength={100}
          onFocus={() => Alert.alert('Подсказка', 'Данное поле не является обязательным.')}
        />

        <Text style={styles.label}>Фото питомца</Text>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={pickImage} style={styles.smallButton} labelStyle={styles.buttonText}>
            Выбрать фото
          </Button>
          <Button mode="contained" onPress={takePhoto} style={styles.smallButton} labelStyle={styles.buttonText}>
            Сделать снимок
          </Button>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button mode="contained" onPress={handleSubmit} style={styles.saveButton} labelStyle={styles.savebuttonText}>
          Сохранить
        </Button>
      </View>
      <Button mode="outlined" style={styles.backButton} labelStyle={styles.backText} onPress={() => router.back()}>
        Назад
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#FFA500',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  label: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    color: '#FFFFFF',
    marginRight: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    width: '48%',
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    width: '100%',
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButton: {
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  backText: {
    color: '#FFA500',
    fontSize: 16,
  },
  savebuttonText: {
    color: '#121212',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#121212',
    fontSize: 11,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});
