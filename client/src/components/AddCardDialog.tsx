import "../style/style.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Title from "@mui/material/DialogTitle";
import Actions from "@mui/material/DialogActions";
import Content from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@apollo/client";
import { ADD_CARD_MUTATION, CARDS_QUERY, SETS_QUERY } from "../graphql";
import { CardType } from "../types";
import { useAppSelector } from "../store/hooks";

const initialValue: CardType = {
  question: "",
  answer: "",
  createdAt: "",
  lastReading: "",
  history: [],
  id: "",
};

type props = {
  setId: string;
};

const AddCardDialog = ({ setId }: props) => {
  const { isLightMode } = useAppSelector((state) => state.mode);
  const [open, setOpen] = useState(false);
  const [newCard, setNewCard] = useState<CardType>(initialValue);
  const [addCardMutation] = useMutation(ADD_CARD_MUTATION, {
    refetchQueries: [
      { query: CARDS_QUERY, variables: { id: setId } },
      { query: SETS_QUERY },
    ],
  });
  const saveNewCard = () => {
    addCardMutation({
      variables: {
        question: newCard.question,
        answer: newCard.answer,
        set: setId,
      },
    });
    setNewCard(initialValue);
  };
  return (
    <>
      <div
        className={isLightMode ? "new-card-l" : "new-card"}
        onClick={() => setOpen(true)}
      >
        <AddIcon></AddIcon>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Title sx={{ color: isLightMode ? "#242424" : "whitesmoke" }}>
          Add New Card
        </Title>
        <Content>
          <TextField
            name="card-question"
            label="Question"
            variant="outlined"
            value={newCard.question}
            onChange={(e) =>
              setNewCard({ ...newCard, question: e.target.value })
            }
          ></TextField>
          <TextField
            name="card-answer"
            label="Answer"
            variant="outlined"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          ></TextField>
        </Content>
        <Actions>
          <Button onClick={saveNewCard}>Add</Button>
        </Actions>
      </Dialog>
    </>
  );
};

export default AddCardDialog;
