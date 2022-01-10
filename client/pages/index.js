import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Box, Container, Input, Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { dataRoomState } from "../src/atoms/atomAula";



export default function Home() {
  const [dataRoom, setDataRoom] = useRecoilState(dataRoomState);


  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>Chat message</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Formik
          initialValues={{ roomName: "", userName: "" }}
          onSubmit={(values, { setSubmitting }) => {

            const data = {
                room: values.roomName,
                username: values.userName,
                
              }
            

            setDataRoom([
              ...dataRoom,
              data
              ,
            ]);


            router.push("/aulas");
          }}
        >
          <Form>
            <Field
              type="text"
              id="roomName"
              name="roomName"
              placeholder="nome da Aula"
            />
            <Field
              type="text"
              id="userName"
              name="userName"
              placeholder="username"
            />
            <Button type="submit">Criar aula</Button>
          </Form>
        </Formik>
      </main>
    </Container>
  );
}
