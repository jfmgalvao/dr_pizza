import Head from "next/head";

import { Header } from "../../components/Header";

import { canSsrAuth } from "../../utils/canSsrAuth";

import styles from "./styles.module.scss";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Dr Pizza</title>
      </Head>
      <div>
        <Header />
      </div>
    </>
  );
}

export const getServerSideProps = canSsrAuth(async (ctx) => {
  return {
    props: {},
  };
});
