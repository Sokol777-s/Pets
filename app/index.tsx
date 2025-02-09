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

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Просьба выбрать цель</Text>
        <Button mode="outlined" style={styles.choiceButton} labelStyle={styles.choiceText}>
          Оставить питомца
        </Button>
        <Button mode="outlined" style={styles.choiceButton} labelStyle={styles.choiceText}>
          Взять питомца
        </Button>
        <Text style={styles.infoText}>Выбор в дальнейшем можно поменять в профиле</Text>
      </View>

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
      <Text style={styles.title}>Добро пожаловать в Pets!</Text>
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
      backgroundColor: '#121212',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    welcomeText: {
      color: '#FFA500',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#F5F5F5',
      padding: 20,
      borderRadius: 20,
      width: '90%',
      alignItems: 'center',
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000',
    },
    choiceButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#FFA500',
      width: '100%',
      marginBottom: 10,
      borderRadius: 20,
    },
    choiceText: {
      color: '#FFA500',
      fontSize: 16,
    },
    infoText: {
      fontSize: 12,
      color: '#555',
      marginTop: 10,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#FFA500',
      width: 200,
      marginBottom: 10,
      borderRadius: 20,
    },
    buttonText: {
      color: '#121212',
      fontSize: 16,
    },
    outlineButton: {
      borderColor: '#FFA500',
      borderWidth: 2,
      width: 200,
      borderRadius: 20,
    },
    outlineText: {
      color: '#FFA500',
      fontSize: 16,
    },
    logoutButton: {
      backgroundColor: '#FF4500',
      width: 200,
      marginTop: 20,
      borderRadius: 20,
    },
    title: {
      color: '#FFA500',
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      color: '#BBBBBB',
      fontSize: 12,
      marginBottom: 20,
    },
  
   
    
  });
 
