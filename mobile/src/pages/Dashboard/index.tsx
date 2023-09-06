import React, { useContext, useState } from "react";

import { Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamsList } from "../../routes/app.routes";
import { AuthContext } from "../../contexts/AuthContext";

import { styles } from "./dashboard.styles";
import { api } from "../../services/api";

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const { signOut } = useContext(AuthContext);

  const [tableNumber, setTableNumber] = useState("");

  async function openOrder() {
    if (tableNumber === "") {
      return;
    }

    const response = await api.post("/order", { table: Number(tableNumber) });

    navigation.navigate("Order", {
      number: tableNumber,
      order_id: response.data.id,
    });

    setTableNumber("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Numero da mesa"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        keyboardType="numeric"
        value={tableNumber}
        onChangeText={setTableNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
