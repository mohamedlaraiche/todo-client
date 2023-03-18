import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./style.css";

const App = () => {
  const [Todos, setTodos] = useState([]);
  const [modal, setModal] = useState("modalOff");
  const [add, setAdd] = useState("");
  const [update, setUpdate] = useState("");
  const [editId, setEditId] = useState(null);

  const updateToggle = (id) => {
    console.log(id);
    setEditId(id);
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
      console.log(response.data);
      setTodos([...Todos, { Todo: add }]);
      setAdd("");
    }
    window.location.href = "https://moatodoapp.vercel.app/";
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
  };

  // Update
  const updateHandler = (e) => {
    e.preventDefault();
    console.log(editId);
    axios
      .put(
        `https://fair-rose-caterpillar-yoke.cyclic.app/api/todos/${editId}`,
        { Todo: update }
      )
      .then(() =>
        setTodos(
          Todos.map((todo) => (todo._id === editId ? { Todo: update } : todo))
        )
      );
    window.location.href = "https://moatodoapp.vercel.app/";
    setUpdate("");
    setModal("modalOff");
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
              <button
                className="updateBtn"
                onClick={(e) => updateToggle(todo._id)}>
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
                <div className="closeHolder">
                  <button
                    className="close"
                    onClick={() => setModal("modalOff")}>
                    X
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    updateHandler(e, todo._id);
                  }}>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    value={update}
                    placeholder="UpdateTodo"
                    onChange={(e) => {
                      setUpdate(e.target.value);
                    }}
                  />

                  <button type="submit" className="updateBtn">
                    Update Todo
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
