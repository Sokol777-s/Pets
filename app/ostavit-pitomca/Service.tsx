import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ServiceSelection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите услугу</Text>
      <TouchableOpacity style={styles.option} onPress={() => alert('Перередержка выбрана')}>
        <Text style={styles.optionText}>Перередержка</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => alert('Выгул выбран')}>
        <Text style={styles.optionText}>Выгул</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  option: {
    marginTop: 10,
    padding: 10
  },
  optionText: {
    fontSize: 18
  }
});
