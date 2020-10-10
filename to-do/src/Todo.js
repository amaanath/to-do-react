import React from 'react'

const Todo = ({todo, deleteTodo}) => {
    

    return (
        <div className = "todo">
            <p>{todo}</p>
            <button onClick={deleteTodo}>❌ Delete</button>
        </div>
    )
}

export default Todo
