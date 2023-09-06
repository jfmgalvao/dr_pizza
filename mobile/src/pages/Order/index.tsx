import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./order.styles";
import { api } from "../../services/api";

type RouteDetailParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name="trash-2" size={28} color="#FF3F4b" />
        </TouchableOpacity>
      </View>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          placeholder="Informe a quantidade"
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          style={[styles.input, { width: "60%", textAlign: "center" }]}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avençar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
