import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { v1 as uuid } from "uuid";

const CreateRoom = () => {
  const navigate = useNavigate();

  function create() {
    const id = uuid();
    navigate(`/room/${id}`);
  }

  return <Button onClick={create}>Create Room</Button>;
};

export default CreateRoom;
