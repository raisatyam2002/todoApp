import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo.jsx";
import NavBar from "./Navbar";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "go to gym",
      description: "at 8 pm",
      id: 1,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTodos(data);
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData(); // Initial data fetch

    setInterval(fetchData, 3000);
  }, []);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  function handleClick() {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      title: inputTitle,
      description: inputDescription,
    };
    const send = async () => {
      try {
        const dataToSend = newTodo;

        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Data sent successfully:", responseData);
        } else {
          console.error("Failed to send data.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    send();
    setTodos([...todos, newTodo]);

    setInputTitle("");
    setInputDescription("");
  }

  const handleDelete = (id) => {
    fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      });
  };

  return (
    <>
      <div>
        <NavBar></NavBar>
        <input
          type="text"
          placeholder="Title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <button onClick={() => handleClick()}>Post</button>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
            id={todo.id}
            onDelete={handleDelete} // Pass the handleDelete function as a prop
          />
        ))}
      </div>
    </>
  );
}

export default App;
