import { Container, Text, Box, Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRecoilValue, useRecoilState } from "recoil";
import { dataInfoRoomState } from "../../src/atoms/atomInfoAula";
import { dataMessage } from "../../src/atoms/atomMessage";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

const InfoAula = () => {
  const userData = useRecoilValue(dataInfoRoomState);

  const [msg, setMsg] = useRecoilState(dataMessage);

  // const msg = [];

  // const setCallbackMsg = useCallback((NewMsg) => {
  //   setMsg([...msg, NewMsg]);
  // }, []);

  console.log("user data aqui =>", msg);

  const socketRef = useRef();

  useEffect(() => {
    const { socket } = require("../../src/services");

    socketRef.current = socket;

    socketRef.current.on("connect", () => {
      console.log("This is connected => [IO] info aulas");
    });

    socketRef.current.on("message", (data) => {
      console.log("to escutando => ", data);
      // msg.push(data);
      setMsg((msgs) => [...msgs, data]);
    });
  }, []);

  console.log("ttt", msg);
  return (
    <Container>
      <Box>
        <Text></Text>
      </Box>

      <Box
        overflow="scroll"
        border="1px solid red"
        width="500px"
        height="300px"
        color="black"
      >
        {
          // JSON.stringify(msg)
          msg ? (
            msg.map((itemMsg, index) => (
              <Box key={index}>
                <Text>{itemMsg.text}</Text>
              </Box>
            ))
          ) : (
            <Text>Message here</Text>
          )
        }
      </Box>

      <Box>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(value, actions) => {
            const data = {
              ...userData,
              message: value.message,
            };

            socketRef.current.emit("message", data, (resp) =>
              console.log("resposta do emit", resp)
            );
            actions.resetForm();
          }}
        >
          <Form>
            <Field
              id="message"
              name="message"
              placeholder="Type a new message"
            />
            <Button type="submit">Enviar</Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default InfoAula;
