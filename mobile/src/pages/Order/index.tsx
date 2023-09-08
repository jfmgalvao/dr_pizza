import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamsList } from "../../routes/app.routes";

import { Feather } from "@expo/vector-icons";

import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

import { styles } from "./order.styles";

type RouteDetailParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

export type ProductProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [categories, setCategories] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function loadInfo() {
      await api
        .get("/category/list")
        .then((response) => {
          setCategories(response.data);
          setCategorySelected(response.data[0]);
        })
        .catch((err) => {
          console.log("[ERROR] loadInfo => ", err);
        });
    }

    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      await api
        .get("/product/find", {
          params: { category_id: categorySelected?.id },
        })
        .then((response) => {
          setProducts(response.data);
          setProductSelected(response.data[0]);
        })
        .catch((err) => {
          console.log("[ERROR] loadProducts => ", err);
        });
    }

    loadProducts();
  }, [categorySelected]);

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

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

  async function handleAdd() {
    const response = await api.post("/order/item", {
      amount: Number(amount),
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
    });

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount,
    };

    setItems((oldArray) => [...oldArray, data]);
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete("/order/item", { params: { item_id: item_id } });
    let removeItem = items.filter((item) => {
      return item.id !== item_id;
    });
    setItems(removeItem);
  }

  function handleFinishOrder() {
    navigation.navigate("FinishOrder", {
      number: route.params?.number,
      order_id: route.params?.order_id,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#FF3F4b" />
          </TouchableOpacity>
        )}
      </View>

      {categories.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          keyboardType="numeric"
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items?.length === 0 ? 0.3 : 1 }]}
          disabled={items?.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDeleteItem} />
        )}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          options={categories}
          handleCloseModal={() => setModalCategoryVisible(false)}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          options={products}
          handleCloseModal={() => setModalProductVisible(false)}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}
