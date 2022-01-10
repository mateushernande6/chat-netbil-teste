import { Container, Text, Box, Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import {useRecoilValue} from 'recoil'
import {dataInfoRoomState} from '../../src/atoms/atomInfoAula'
import {useEffect} from 'react'


const { socket } = require("../../src/services");

socket.on('message', (data) => {
  console.log('to escutando => ',data) 
  
} )

const InfoAula = () => {

  const userData = useRecoilValue(dataInfoRoomState)

  console.log('user data aqui =>',userData)


  useEffect(() => {
    socket.on("connect", () => {
  // console.log("id => ", socket.id);
  console.log("This is connected => [IO] aulas");

  
});
  }, [])
  return (
    <Container>
      <Box>
        <Text></Text>
      </Box>

      <Box>messge here</Box>

      <Box>
        <Formik
        initialValues={{message:''}}
        onSubmit={(value, actions)=>{

          const data = {
            ...userData, message:value.message
          }
          
          socket.emit('message', data)
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