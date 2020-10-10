import React, {useState} from 'react';
import './App.css';
import Todo from './Todo';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(["Take dogs out", "Take out Trash", "Do school hw"]);

  const createInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const addTodo = () => {
    setTodos([...todos, input])
  }

  const deleteTodo = (index) => {
    let removedTodos = todos.splice(index, 1);
 
  }

  return (
    <div className="app">
      <h1>Hello World</h1>
      <input type="text" value={input} onChange={(event) => createInput(event)} />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo, i) => (
        <Todo todo={todo} deleteTodo={() => deleteTodo(i)}/>
      ))}
    </div>
  );
}

export default App;
