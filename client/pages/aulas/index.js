import { Container, Box, Text } from "@chakra-ui/react";
import { useRecoilValue, useRecoilState } from "recoil";
import { dataRoomState } from "../../src/atoms/atomAula";
import { dataInfoRoomState } from "../../src/atoms/atomInfoAula";
import { useRouter } from "next/router";

const Aulas = () => {
  const dataRooms = useRecoilValue(dataRoomState);
  const [infoRoom, setInfoRoom] = useRecoilState(dataInfoRoomState);

  console.log("aula", dataRooms);

  const handleClick = (data) => {
    setInfoRoom(data);
  };

  return (
    <Container>
      {!!dataRooms &&
        dataRooms.map((item, key) => (
          <Box
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
