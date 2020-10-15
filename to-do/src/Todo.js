import React, { useState, useEffect } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db, authM } from "./firebase";
import {
  CheckOutlined as CheckOutlinedIcon,
  UpdateOutlined,
  Adjust,
} from "@material-ui/icons";

const Todo = ({ todo, deleteTodo, updateTodo, allTodos }) => {
  const [update, setUpdate] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let sTodo = allTodos.find((obj) => obj.name === updateTodo);
    setUpdate(`${sTodo.todo}`);
  }, [allTodos, updateTodo]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "relative",
      margin: "250px auto",
      width: 400,
      height: 200,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    paperInput: {
      height: "4vh",
      borderRadius: "12px",
      marginRight: "10px",
    },
    paperClose: {
      position: "absolute",
      right: 10,
      bottom: 20,
    },
  }));
  const classes = useStyles();

  const updateTodoModal = () => {
    setOpen(true);
  };

  const updateTodoM = () => {
    db.collection("alltodos")
      .doc(authM.currentUser.uid)
      .collection("userTodos")
      .doc(updateTodo)
      .set(
        {
          todo: update,
        },
        { merge: true }
      );
  };

  return (
    <div className="todo__container">
      <div className="todo">
        <div>
          <h2>
            <Adjust
              style={{
                color: "red",
                marginRight: "10px",
                position: "relative",
                top: "2px",
              }}
            />
            {todo}
          </h2>
        </div>
        <div>
          <Button variant="contained" color="secondary" onClick={deleteTodo}>
            <CheckOutlinedIcon />
          </Button>
          <Button variant="contained" color="primary" onClick={updateTodoModal}>
            <UpdateOutlined />
          </Button>
        </div>
      </div>
      {/* For updating a todo */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <div>
            <h2>Update Todo</h2>
            <input
              type="text"
              value={update}
              className={classes.paperInput}
              onChange={(e) => setUpdate(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={updateTodoM}
            >
              Modify
            </Button>
          </div>
          <div className={classes.paperClose}>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
