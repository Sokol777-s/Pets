import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ServiceSelection() {
  const router = useRouter();

  const handleSelectService = (service: string) => {
    console.log(`Выбрана услуга: ${service}`);

    if (service === 'Перередержка') {
      router.push('/ostavit-pitomca/perederzhka');
    } else if (service === 'Выгул') {
      router.push('/ostavit-pitomca/walking');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите услугу</Text>

      <TouchableOpacity style={styles.option} onPress={() => handleSelectService('Перередержка')}>
        <Text style={styles.optionText}>Перередержка</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleSelectService('Выгул')}>
        <Text style={styles.optionText}>Выгул</Text>
      </TouchableOpacity>

      <Button
        mode="outlined"
        onPress={() => router.push('/ostavit-pitomca/PetForm')}
        style={styles.backButton}
        labelStyle={styles.backText}
      >
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
  option: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  backButton: {
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 12,
    width: '90%',
  },
  backText: {
    color: '#FFA500',
    fontSize: 16,
  },
});
