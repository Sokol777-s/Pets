import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setError(null);

    try {
      const signInAttempt = await signIn.create({ identifier: emailAddress, password });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Ошибка входа');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
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

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <Text style={styles.backButtonText}>⬅ Назад на главную</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 **Стили**
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { color: '#FFA500', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', backgroundColor: '#1E1E1E', color: '#FFFFFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#444', marginBottom: 12 },
  errorText: { color: '#FF4500', marginBottom: 10 },
  button: { backgroundColor: '#FFA500', paddingVertical: 12, width: '100%', alignItems: 'center', borderRadius: 20, marginTop: 10 },
  buttonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  backButton: { backgroundColor: '#444', paddingVertical: 12, width: '100%', alignItems: 'center', borderRadius: 20, marginTop: 10 },
  backButtonText: { color: '#FFFFFF', fontSize: 16 },
});
