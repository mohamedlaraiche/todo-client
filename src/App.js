import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./style.css";

const App = () => {
  const [Todos, setTodos] = useState([]);
  const [modal, setModal] = useState("modalOff");
  const [add, setAdd] = useState("");
  const updateToggle = () => {
    setModal("modalOn");
  };
  // add a todo

  const addHandler = async (e) => {
    e.preventDefault();
    if (!add) {
      swal("Please add a todo first");
    } else {
      const response = await axios.post(
        `https://fair-rose-caterpillar-yoke.cyclic.app/api/todos`,
        { Todo: add }
      );
      console.log(response);
      setTodos([...Todos, { Todo: add }]);
      setAdd("");
    }
  };

  // get Todos
  const getTodos = async () => {
    const response = await axios.get(
      "https://fair-rose-caterpillar-yoke.cyclic.app/api/todos"
    );
    const data = await response.data;
    setTodos(data.data);
  };
  useEffect(() => {
    getTodos();
  }, []);

  // delete Todos

  const DeleteTodo = (e, id) => {
    e.preventDefault();
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your Todo has been deleted!", {
          icon: "success",
        });
        axios.delete(
          `https://fair-rose-caterpillar-yoke.cyclic.app/api/todos/${id}`
        );
        const newList = Todos.filter((todo) => todo._id !== id);
        setTodos(newList);
      } else {
        swal("Your Todo is safe!");
      }
    });

    console.log(`id ${id}, has been deleted`);
  };
  return (
    <div className="container box">
      <div className="todoHead">
        <h1>TODO APP</h1>
        <form onSubmit={(e) => addHandler(e)}>
          <input
            type="text"
            placeholder="Add Todo"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
          <button type="submit">Add </button>
        </form>
      </div>
      <div className="todosHolder">
        {Todos.map((todo) => (
          <div key={todo._id} className="cart">
            <div>
              <p> {todo.Todo} </p>
              <p> {todo.Detail} </p>
            </div>
            <div className="mngBtns">
              <button className="updateBtn" onClick={(e) => updateToggle(e)}>
                Update
              </button>
              <button
                className="deleteBtn"
                onClick={(e) => {
                  DeleteTodo(e, todo._id);
                }}>
                Delete
              </button>
            </div>
            <div id="myModal" className={modal}>
              <div className="modal-content">
                <button onClick={() => setModal("modalOff")}>X</button>
                <input
                  style={{ color: "black" }}
                  type="text"
                  placeholder="UpdateTodo"
                  onChange={(e) => {}}
                />

                <button onClick={(e) => {}} className="updateBtn">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
