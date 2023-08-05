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
import { ADD_SET_MUTATION, SETS_QUERY } from "../graphql";
import { useAppSelector } from "../store/hooks";

const AddSetDialog = () => {
  const { isLightMode } = useAppSelector((state) => state.mode);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [addSetMutation] = useMutation(ADD_SET_MUTATION, {
    refetchQueries: [{ query: SETS_QUERY }],
  });
  const saveNewSet = () => {
    addSetMutation({ variables: { name: name } });
    setName("");
    setOpen(false);
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
          Add New Set
        </Title>
        <Content>
          <TextField
            name="set-name"
            label="Set Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </Content>
        <Actions>
          <Button onClick={saveNewSet}>Add</Button>
        </Actions>
      </Dialog>
    </>
  );
};

export default AddSetDialog;
