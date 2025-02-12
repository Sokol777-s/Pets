import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Ошибка регистрации');
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setError(null);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Ошибка подтверждения');
    }
  };

  return (
    <View style={styles.container}>
      {pendingVerification ? (
        <>
          <Text style={styles.title}>Подтвердите Email</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            value={code}
            placeholder="Введите код"
            placeholderTextColor="#AAAAAA"
            onChangeText={setCode}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
            <Text style={styles.buttonText}>Подтвердить</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Регистрация</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Введите email"
            placeholderTextColor="#AAAAAA"
            onChangeText={setEmailAddress}
            style={styles.input}
          />
          <TextInput
            value={password}
            placeholder="Введите пароль"
            placeholderTextColor="#AAAAAA"
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Продолжить</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <Text style={styles.backButtonText}>⬅ Назад на главную</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1,
     backgroundColor: '#121212',
     justifyContent: 'center', 
     alignItems: 'center',
      padding: 20 },

  title: { color: '#FFA500',
     fontSize: 28,
     fontWeight: 'bold',
      marginBottom: 20 },

  input: { width: '100%',
     backgroundColor: '#1E1E1E',
      color: '#FFFFFF', 
      padding: 15, 
      borderRadius: 12, 
      borderWidth: 1, 
      borderColor: '#444', 
      marginBottom: 12 },

  errorText: { color: '#FF4500',
     marginBottom: 10 },

  button: { backgroundColor: '#FFA500', 
    paddingVertical: 12,
     width: '100%', 
     alignItems: 'center',
      borderRadius: 20,
       marginTop: 10 },

  buttonText: { color: '#121212',
    fontSize: 16, 
    fontWeight: 'bold' },

  backButton: { backgroundColor: '#444',
     paddingVertical: 12,
      width: '100%',
       alignItems: 'center',
        borderRadius: 20,
         marginTop: 10 },

  backButtonText: { color: '#FFFFFF',
     fontSize: 16 },
});
