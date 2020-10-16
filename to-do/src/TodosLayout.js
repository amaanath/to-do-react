import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { authM, db } from "./firebase";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export const TodosLayout = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  let history = useHistory();

  useEffect(() => {
    // checks if user is logged in
    authM.onAuthStateChanged((user) => {
      if (user) {
        db.collection("alltodos")
          .doc(user.uid)
          .collection("userTodos")
          .orderBy("id", "desc")
          .onSnapshot((doc) =>
            setTodos(
              doc.docs.map((doc) => ({
                todo: doc.data().todo,
                name: doc.id,
              }))
            )
          );
      } else {
        console.log("not logged in");
      }
    });
  }, []);
  const createInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const addTodo = () => {
    db.collection("alltodos")
      .doc(authM.currentUser.uid)
      .collection("userTodos")
      .doc()
      .set({
        todo: input,
        id: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  const deleteTodo = (id) => {
    db.collection("alltodos")
      .doc(authM.currentUser.uid)
      .collection("userTodos")
      .doc(id)
      .delete();
  };

  const signOut = () => {
    history.push("/");
    authM.signOut();
  };

  return (
    <div className="app__home">
      <Button
        variant="contained"
        color="secondary"
        style={{
          width: "10vw",
          alignSelf: "flex-end",
          marginRight: "20px",
        }}
        onClick={signOut}
      >
        Sign Out
      </Button>
      <h1>Here are your Todos:</h1>
      <div className="app__homeInfo">
        <input
          type="text"
          value={input}
          onChange={(event) => createInput(event)}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={!input}
          onClick={addTodo}
        >
          <AddIcon />
        </Button>
      </div>

      {todos?.length > 0 ? (
        <div className="app__homeTodos">
          {todos.map((todo, i) => (
            <Todo
              todo={todo.todo}
              key={i * Math.random() * 100}
              deleteTodo={() => deleteTodo(todo.name)}
              updateTodo={todo.name}
              allTodos={todos}
            />
          ))}{" "}
        </div>
      ) : (
        <h3>
          Once you add todos, they will appear here and will always be here
          until you delete them .
        </h3>
      )}
    </div>
  );
};
