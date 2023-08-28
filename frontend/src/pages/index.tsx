import Head from "next/head";
import Image from "next/image";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

import styles from "../../styles/home.module.scss";
import logoImg from "../../public/logo.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>DrPizza - faça o login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Dr Pizza" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <a className={styles.text}>Registra-se</a>
        </div>
      </div>
    </>
  );
}
