import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    gap: 2,
    display: "flex",
    flexDirection: "column",
};

const AddToDoItemModal = ({ isOpen, onClose, addNewTask }) => {
    const [task, setTask] = useState({});

    const createNewTask = () => {
        const postData = { ...task, id: uuidv4(), status: "created" };
        addNewTask(postData);
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Create new task
                </Typography>
                <TextField
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    id="outlined-basic"
                    label="Task title"
                    variant="outlined"
                />
                <Button variant="outlined" onClick={createNewTask}>
                    Create
                </Button>
            </Box>
        </Modal>
    );
};

export default AddToDoItemModal;
