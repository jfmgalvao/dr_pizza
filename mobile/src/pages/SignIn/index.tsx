import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";
import { styles } from "./sign-in.styles";

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }

    await signIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#F0F0F0"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#F0F0F0"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="FFF" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
