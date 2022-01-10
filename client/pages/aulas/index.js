import { Container, Box, Text } from "@chakra-ui/react";
import { useRecoilValue, useRecoilState } from "recoil";
import { dataRoomState } from "../../src/atoms/atomAula";
import { dataInfoRoomState } from "../../src/atoms/atomInfoAula";
import { useRouter } from "next/router";
import {useEffect} from 'react'

const { socket } = require("../../src/services");




const Aulas = () => {
  const dataRooms = useRecoilValue(dataRoomState);
  const [infoRoom, setInfoRoom] = useRecoilState(dataInfoRoomState);
  
  const router = useRouter()

  console.log("aula", dataRooms);

  const handleClick = (data) => {

    socket.emit('select_room', data)
    setInfoRoom( data);
    router.push('/infoaula')
  };

useEffect(() => {
  socket.on("connect", () => {
  // console.log("id => ", socket.id);
  console.log("This is connected => [IO] aulas");
});
}, [])

  return (
    <Container>
      {!!dataRooms &&
        dataRooms.map((item, key) => (
          <Box
          key={key}
            onClick={() => handleClick(item)}
            border="1px solid gray"
            padding="5px"
            borderRadius="10px"
          >
            <Text>{item.room}</Text>
          </Box>
        ))}
    </Container>
  );
};

export default Aulas;
