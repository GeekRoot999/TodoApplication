import { useState, useEffect } from "react";
import AddTodoTask from "./AddTodoTask";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config";
import TitleCard from "./TitleCard";

export default function TodoApplication() {
  const [toDoList, setToDoList] = useState([]);
  // const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddItems = (isValue) => {
    if (isValue !== "") {
      let nextValue = { item: isValue, id: toDoList.length, completed: false };
      const AddTodoCollection = collection(db, "Todos");
      addDoc(AddTodoCollection, nextValue)
        .then(() => {
          setToDoList([...toDoList, nextValue]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return toDoList;
    }
  };

  const handleCheckbox = (id, isCompleted) => {
    const TodoCheckBox = doc(db, "Todos", id);
    updateDoc(TodoCheckBox, { completed: isCompleted })
      .then((response) => {
        setToDoList(
          toDoList.map((todo) => {
            if (todo.id === id) {
              console.log("isCompleted", isCompleted);
              return { ...todo, completed: isCompleted };
            } else {
              return todo;
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputEdit = (id, newValue) => {
    console.log(id, "handleInputEdit");
    const TodoCollection = doc(db, "Todos", id);
    updateDoc(TodoCollection, { item: newValue })
      .then((response) => {
        setToDoList(
          toDoList.map((todo) => {
            if (todo.id === id) {
              return { ...todo, item: newValue };
            } else {
              return todo;
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    const deleteTodo = doc(db, "Todos", id);
    deleteDoc(deleteTodo)
      .then(() => {
        setToDoList(toDoList.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    const TodoCollection = collection(db, "Todos");
    getDocs(TodoCollection)
      .then((response) => {
        // console.log(response);
        // console.log(response._snapshot);
        // console.log(response.docs);
        const todos = response.docs.map((todo) => {
          return {
            item: todo.data().item,
            id: todo.id,
            completed: todo.data().completed,
          };
        });
        setToDoList(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="main-container">
      <div className="list-container">
        <TitleCard title="Task Application" />

        <div className="list-wrapper">
          <AddTodoTask handleAddItems={handleAddItems} />
          <ul className="todo-list-items">
            {toDoList.length > 0 ? toDoList.map(todo => {
              return <li className={`list-items`} key={todo.id}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="check"
                    checked={todo.completed}
                    onChange={(e) => handleCheckbox(todo.id, e.target.checked)} 
                  />
                  {isEditing && (<>
                    <span className={`${todo.completed ? 'checked' : ''}`}>
                      <input type='text' value={todo.item} onChange={(e) => {
                        console.log(todo.id, "todo id");
                        handleInputEdit(todo.id, e.target.value)
                        }}/>
                    </span>
                    <button className="edit" onClick={() => setIsEditing(false)}>Save</button>
                  </>)}
                  {!isEditing && (<>
                    <span className={`${todo.completed ? 'checked' : ''}`}>{todo.item}</span>
                    <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
                  </>)}
                <button 
                  className="delete"
                  onClick={(e) => handleDelete(todo.id)}
                >Delete</button>
              </li>
            }) : ""}
          </ul>
          {/* <table>
            <tbody>
              {toDoList.length > 0 &&
                toDoList.map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td>
                        <input
                          className="checkbox"
                          type="checkbox"
                          id="check"
                          checked={todo.completed}
                          onChange={(e) =>
                            handleCheckbox(todo.id, e.target.checked)
                          }
                        />
                      </td>
                      <td>
                        {isEditing && (
                          <>
                            <input
                              type="text"
                              value={todo.item}
                              onChange={(e) => {
                                console.log(todo.id, "todo id");
                                handleInputEdit(todo.id, e.target.value);
                              }}
                            />
                            <button onClick={() => setIsEditing(false)}>
                              Save
                            </button>
                          </>
                        )}
                      </td>
                      <td>
                        {!isEditing && (
                          <>
                            {todo.item}
                            <button onClick={() => setIsEditing(true)}>
                              Edit
                            </button>
                          </>
                        )}
                      </td>
                      <td>
                        <button onClick={(e) => handleDelete(todo.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
