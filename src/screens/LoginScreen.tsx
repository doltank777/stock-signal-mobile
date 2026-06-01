import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { login } from "../api/authApi";
import { saveAccessToken } from "../storage/tokenStorage";
import { loginStyles as styles } from "../styles/loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("알림", "이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const token = await login({ email, password });

      await saveAccessToken(token);

      Alert.alert("성공", "로그인되었습니다.");
      router.replace("/signals");
    } catch (error) {
      console.error("로그인 실패", error);
      Alert.alert("로그인 실패", "이메일 또는 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Signal</Text>
      <Text style={styles.description}>로그인 후 추천 Signal을 확인하세요.</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}