import React from "react";

function Todo(props) {
  const handleDelete = () => {
    // Call the onDelete function passed as a prop with the todo's id
    props.onDelete(props.id);
  };

  return (
    <div>
      <br />
      <p>Title: {props.title}</p>
      <p>Description: {props.description}</p>
      <button onClick={handleDelete}>Delete</button>
      <br />
    </div>
  );
}

export default Todo;
