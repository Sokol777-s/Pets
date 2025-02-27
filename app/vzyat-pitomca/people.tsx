import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function AdoptionForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const [timeForPet, setTimeForPet] = useState<boolean | null>(null);
  const [vetVisit, setVetVisit] = useState<boolean | null>(null);
  const [livingConditions, setLivingConditions] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Разрешение", "Для работы камеры нужно разрешение.");
      }
    })();
  }, []);

  // Скрыть клавиатуру при нажатии на любой участок формы
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Выбор фото из галереи
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Сделать фото с камеры
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Заполните анкету</Text>

        <TextInput
          style={styles.input}
          placeholder="Имя"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Возраст"
          placeholderTextColor="#AAAAAA"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        {/* Кнопки загрузки и съемки фото (размещены рядом) */}
        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Загрузить фото</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
            <Text style={styles.uploadButtonText}>Сделать снимок</Text>
          </TouchableOpacity>
        </View>

        {photo && <Image source={{ uri: photo }} style={styles.image} />}

        <Text style={styles.question}>Есть опыт ухода за животными?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setHasExperience(true)} style={[styles.radio, hasExperience === true && styles.selectedRadio]}>
            <Text style={styles.radioText}>Да</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHasExperience(false)} style={[styles.radio, hasExperience === false && styles.selectedRadio]}>
            <Text style={styles.radioText}>Нет</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>Есть время ухаживать за питомцем?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setTimeForPet(true)} style={[styles.radio, timeForPet === true && styles.selectedRadio]}>
            <Text style={styles.radioText}>Да</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTimeForPet(false)} style={[styles.radio, timeForPet === false && styles.selectedRadio]}>
            <Text style={styles.radioText}>Нет</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>Как относишься к походам к ветеринару?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setVetVisit(true)} style={[styles.radio, vetVisit === true && styles.selectedRadio]}>
            <Text style={styles.radioText}>Положительно</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVetVisit(false)} style={[styles.radio, vetVisit === false && styles.selectedRadio]}>
            <Text style={styles.radioText}>Отрицательно</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.question}>Опиши свои условия проживания</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Например: живу в частном доме с двором..."
          placeholderTextColor="#AAAAAA"
          value={livingConditions}
          onChangeText={setLivingConditions}
          multiline
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Отправить</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>⬅ Назад</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#121212', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 20 
    },
  
    title: { 
      color: '#FFFFFF', 
      fontSize: 22, 
      fontWeight: 'bold', 
      marginBottom: 20 
    },
  
    input: { 
      width: '90%',
      backgroundColor: '#1E1E1E', 
      color: '#FFFFFF', 
      padding: 15, 
      borderRadius: 12, 
      borderWidth: 1, 
      borderColor: '#444', 
      marginBottom: 12,
      textAlign: 'center' 
    },
  
    textArea: { 
      height: 80 
    },
  
    question: { 
      color: '#FFFFFF', 
      fontSize: 16, 
      marginTop: 10, 
      marginBottom: 10,
      textAlign: 'center' 
    },
  
    radioContainer: { 
      flexDirection: 'row', 
      justifyContent: 'center', 
      marginVertical: 10 
    },
  
    radio: { 
      backgroundColor: '#444', 
      paddingVertical: 10, 
      paddingHorizontal: 20, 
      borderRadius: 20, 
      marginHorizontal: 5 
    },
  
    selectedRadio: { 
      backgroundColor: '#FFA500' 
    },
  
    radioText: { 
      color: '#FFFFFF', 
      fontSize: 16 
    },
  
    button: { 
      backgroundColor: '#FFA500', 
      paddingVertical: 12, 
      alignItems: 'center', 
      borderRadius: 20, 
      marginTop: 20, 
      width: '90%' 
    },
  
    buttonText: { 
      color: '#121212', 
      fontSize: 16, 
      fontWeight: 'bold' 
    },
  
    backButton: { 
      backgroundColor: '#444', 
      paddingVertical: 12, 
      alignItems: 'center', 
      borderRadius: 20, 
      marginTop: 10, 
      width: '90%' 
    },
  
    backButtonText: { 
      color: '#FFFFFF', 
      fontSize: 16 
    },
  
    photoContainer: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      width: '90%',
      marginBottom: 10 
    },
  
    uploadButton: { 
      backgroundColor: '#444', 
      paddingVertical: 10, 
      flex: 1,
      alignItems: 'center', 
      borderRadius: 20, 
      marginHorizontal: 5
    },
  
    uploadButtonText: { 
      color: '#FFFFFF', 
      fontSize: 16 
    },
  
    image: { 
      width: 100, 
      height: 100, 
      borderRadius: 10, 
      marginTop: 10 
    }
  });
  