import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Title from "@mui/material/DialogTitle";
import Actions from "@mui/material/DialogActions";
import Content from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { CARDS_QUERY, DELETE_CARD_MUTATION, SETS_QUERY } from "../graphql";
import { useAppSelector } from "../store/hooks";
type props = {
  id: string;
  setId: string;
};
const DeleteCardDialog = ({ id, setId }: props) => {
  const { isLightMode } = useAppSelector((state) => state.mode);
  const [open, setOpen] = useState(false);
  const [deleteCardMutation] = useMutation(DELETE_CARD_MUTATION, {
    refetchQueries: [
      { query: CARDS_QUERY, variables: { id: setId } },
      { query: SETS_QUERY },
    ],
  });
  const deleteCard = () => {
    deleteCardMutation({
      variables: {
        id: id,
        set: setId,
      },
    });
    setOpen(false);
  };
  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        <DeleteIcon></DeleteIcon>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Title sx={{ color: isLightMode ? "#242424" : "whitesmoke" }}>
          Delete Card
        </Title>
        <Content>Are you sure you want to delete this card?</Content>
        <Actions>
          <Button onClick={deleteCard}>Delete</Button>
        </Actions>
      </Dialog>
    </>
  );
};

export default DeleteCardDialog;
