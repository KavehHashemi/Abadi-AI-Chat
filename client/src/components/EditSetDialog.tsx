import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Title from "@mui/material/DialogTitle";
import Actions from "@mui/material/DialogActions";
import Content from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";
import { EDIT_SET_MUTATION, SETS_QUERY } from "../graphql";
import { useAppSelector } from "../store/hooks";

type props = {
  oldName: string;
  id: string;
};

const EditSetDialog = ({ oldName, id }: props) => {
  const { isLightMode } = useAppSelector((state) => state.mode);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(oldName);
  const [editSetMutation] = useMutation(EDIT_SET_MUTATION, {
    refetchQueries: [{ query: SETS_QUERY }],
  });
  const editNewSet = () => {
    editSetMutation({ variables: { id: id, name: name } });
    setName("");
    setOpen(false);
  };
  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        <EditIcon></EditIcon>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Title sx={{ color: isLightMode ? "#242424" : "whitesmoke" }}>
          Edit Set {oldName}
        </Title>
        <Content>
          <TextField
            name="edit-name"
            label="Edit Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </Content>
        <Actions>
          <Button onClick={editNewSet}>Edit</Button>
        </Actions>
      </Dialog>
    </>
  );
};

export default EditSetDialog;
