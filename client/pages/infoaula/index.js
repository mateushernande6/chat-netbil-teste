import { Container, Text, Box, Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import {useRecoilValue, useRecoilState} from 'recoil'
import {dataInfoRoomState} from '../../src/atoms/atomInfoAula'
import {dataMessage} from '../../src/atoms/atomMessage'
import {useEffect, useState, useCallback, useMemo, useRef} from 'react'





const InfoAula = () => {
  
  const userData = useRecoilValue(dataInfoRoomState)
  // const [msg, setMsg] = useState([])

  const msg = []

  // const setMemoMsg = useCallback((NewMsg) => {
  //   setMsg([...msg, NewMsg])
  // }, [msg])
  
  console.log('user data aqui =>',userData)

  const socketRef = useRef()

  useEffect(() => {
    const { socket } = require("../../src/services");

    socket.on("connect", () => {  
      console.log("This is connected => [IO] info aulas");
    });

    socket.on('message',  (data) => {
    console.log('to escutando => ',data) 
    // setMemoMsg(data)
    
  } );

  socketRef.current = socket

  }, [])


  return (
    <Container>
      <Box>
        <Text></Text>
      </Box>

      <Box overflow='scroll' border='1px solid red' width='500px' height='300px'>
        {
          // JSON.stringify(msg)
          // msg ? msg.map((itemMsg, index) => (
          //   <Box key={index}>
          //     <Text>{itemMsg.text}</Text>
          //   </Box>
          // )) : <Text>Message here</Text>
        }
      </Box>

      <Box>
        <Formik
        initialValues={{message:''}}
        onSubmit={(value, actions)=>{

          const data = {
            ...userData, message:value.message
          }
          
          socketRef.current.emit('message', data, 
          (resp) => console.log('resposta do emit',resp)
          )
          actions.resetForm()

          
        }}
        >
          <Form>
            <Field id='message' name='message' placeholder='Type a new message'/>  
            <Button type='submit'>Enviar</Button>
          </Form>          
        </Formik>
      </Box> 
    </Container>
  );
};



export default InfoAula