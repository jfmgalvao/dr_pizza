import { useState } from "react";
import Modal from "react-modal";
import { FiRefreshCcw } from "react-icons/fi";

import Head from "next/head";

import { Header } from "../../components/Header";
import { ModalOrder } from "../../components/ModalOrder.tsx";
import { setupApiClient } from "../../services/api";
import { canSsrAuth } from "../../utils/canSsrAuth";

import styles from "./styles.module.scss";

type OrderProps = {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name: string;
  created_at: string;
  updated_at: string;
};

export type OrderItemProps = {
  id: string;
  amount: number;
  created_at: string;
  updated_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
    created_at: string;
    updated_at: string;
    category_id: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
    created_at: string;
    updated_at: string;
  };
};

interface HomeProps {
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupApiClient();
    const response = await apiClient.get("/order/detail", {
      params: {
        order_id: id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishItem(id: string) {
    const apiClient = setupApiClient();
    await apiClient.put("/order/finish", { order_id: id });

    const response = await apiClient.get("/order/list");
    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrders() {
    const apiClient = setupApiClient();
    const response = await apiClient.get("/order/list");
    setOrderList(response.data);
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Dr Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado...
              </span>
            )}

            {orderList.map((item) => {
              return (
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleOpenModalView(item.id)}>
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                  </button>
                </section>
              );
            })}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFishiOrder={handleFinishItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSsrAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/order/list");

  return {
    props: {
      orders: response.data,
    },
  };
});
