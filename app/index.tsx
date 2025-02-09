import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      {/* Вошедший пользователь */}
      <SignedIn>
        <Text style={styles.welcomeText}>
          Привет, {user?.emailAddresses[0].emailAddress} 👋
        </Text>
        <Button
          mode="contained"
          style={styles.logoutButton}
          labelStyle={styles.buttonText}
          onPress={() => signOut()}
        >
          Выйти
        </Button>
      </SignedIn>

      {/* Гости */}
      <SignedOut>
        <Text style={styles.title}>Добро пожаловать в Pets</Text>
        <Text style={styles.subtitle}>Присоединяйтесь и откройте больше возможностей!</Text>

        <Link href="/sign-in" asChild>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText}>
            Войти
          </Button>
        </Link>

        <Link href="/sign-up" asChild>
          <Button mode="outlined" style={styles.outlineButton} labelStyle={styles.outlineText}>
            Регистрация
          </Button>
        </Link>
      </SignedOut>
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Темный фон
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#FFA500', // Оранжевый цвет
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    color: '#FFA500',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#BBBBBB',
    fontSize: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500', // Оранжевая кнопка
    width: 200,
    marginBottom: 10,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
  },
  outlineButton: {
    borderColor: '#FFA500',
    borderWidth: 2,
    width: 200,
  },
  outlineText: {
    color: '#FFA500',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF4500', // Красная кнопка для выхода
    width: 200,
    marginTop: 20,
  },
});

