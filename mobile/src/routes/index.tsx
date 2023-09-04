import React from "react";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { ActivityIndicator, View } from "react-native";

function Routes() {
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F5F7FB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color="#1D1D2E" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
