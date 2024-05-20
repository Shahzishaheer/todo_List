import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import createTask from "../utils/createTask";
import readTasks from "../utils/readTasks";
import deleteTask from "../utils/deleteTask";
import updateTask from "../utils/updateTask";
import deleteAllItems from "../utils/deleteAllItems";


export default function Todo() {
  const [input, setInput] = useState(""); // Input field state
  const [store, setStore] = useState([]); // Task list state
  const [error, setError] = useState(false); // Error state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date state

  // Function to handle input field change
  const handleChange = (event) => setInput(event.target.value);

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to add a new task
  const addItem = async () => {
    try {
      if (!input.trim()) {
        setError(true);
        setErrorMessage("Input field is empty");
      } else if (/[!@#$%^&*(),?":{}|<>]/.test(input)) {
        setError(true);
        setErrorMessage("Special characters are not allowed");
      } else {
        // Create a new task object with the current timestamp and selected date
        const newTask = {
          task: input,
          date: selectedDate,
          completed: false,
        };

        // Call the createTask function to add the new task to Firebase
        await createTask(newTask);
        // Update the task list state with the new task
        setStore([...store, newTask]);
        // Clear the input field
        setInput("");
      }
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to delete a task
  const deleteTaskForDate = async (taskId) => {
    try {
      // Call the deleteTask function with taskId and selectedDate parameters
      await deleteTask(taskId, selectedDate);
      // Update the task list state by filtering out the deleted task
      setStore(store.filter((item) => item.id !== taskId));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const markTaskAsDone = async (taskId, selectedDate) => {
    try {
      // Call the updateTask function to mark the task as completed in Firestore
      await updateTask(taskId, { completed: true }, selectedDate);
      // Update the task list state by marking the task as completed locally
      setStore((prevStore) => {
        return prevStore.map((item) => {
          if (item.id === taskId) {
            return { ...item, completed: true }; // Update completed status
          }
          return item;
        });
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // useEffect hook to fetch tasks based on the selected date
  useEffect(() => {
    // Call the readTasks function to retrieve tasks for the selected date
    readTasks(setStore, selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div className="container my-3">
        <h1>To Do List</h1>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <figcaption className="fst-italic fw-bolder text-light my-3 text-dark">
          Add your Text here👇👇
        </figcaption>
        <form action="" method="post">
          <div className="container">
            <input
              title="space and @#$%^&*&^% are not allowed"
              className="form-control"
              type="text"
              name=""
              id="1"
              placeholder="✍Enter your text..."
              value={input}
              onChange={handleChange}
              maxLength={18}
            />
            <i className="bi bi-plus addbtn" onClick={addItem}></i>

            {error && (
              <div
                id="errorM"
                style={{
                  color: "white",
                  fontSize: "15px",
                  textAlign: "left",
                  marginBottom: "4px",
                  textDecoration: "underline red",
                }}
              >
                {errorMessage}
              </div>
            )}
          </div>
        </form>

        <div className="container wrapper_item">
          {store?.map((item) => (
            <div
              className={`container list-group list ${
                item.completed ? "completed-task" : ""
              }`}
              key={item.id}
            >
              <h5
                title={item.task}
                className="list-group-item list-group-item-action active Active"
              >
                <div className="task-name">{item.task}</div>
              </h5>

              <i
                className="bi bi-trash deletebtn"
                onClick={() => deleteTaskForDate(item.id)}
              ></i>
              {/* if item completed the icon unappear */}
              {!item.completed && (
                <i
                  className="bi bi-check2-circle donebtn task-name "
                  onClick={() => markTaskAsDone(item.id, selectedDate)}
                ></i>
              )}
            </div>
          ))}
        </div>
        <button
          className="btn btn-secondary my-3 btn1"
          disabled={!store.length}
          onClick={() => deleteAllItems(selectedDate)}
        >
          <i>REMOVE LIST</i>
        </button>
      </div>      
    </>
  );
}
