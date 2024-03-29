import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, handleEditSubmit } from '../redux/todoapp/actions';
import { IoIosAddCircle } from "react-icons/io";

export const Form = ({ editFormVisibility, editTodo, cancelUpdate }) => {
  // Dispatch function to dispatch an action
  const dispatch = useDispatch();

  // State for the todo value in the normal add todo form
  const [todoValue, setTodoValue] = useState('');

  // State for the value to edit in the update form
  const [editValue, setEditValue] = useState('');

  // useEffect to populate the editValue when editTodo changes
  useEffect(() => {
    setEditValue(editTodo.todo);
  }, [editTodo])

  // Handler for submitting a new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate unique ID for the todo item
    let date = new Date();
    let time = date.getTime();
    // Create todo object
    let todoObj = {
      id: time,
      todo: todoValue,
      completed: false
    }
    // Clear input field
    setTodoValue('');
    // Dispatch action to add new todo
    dispatch(addTodo(todoObj))
  }

  // Handler for submitting an updated todo
  const editSubmit = (e) => {
    e.preventDefault();
    // Create edited todo object
    let editedObj = {
      id: editTodo.id,
      todo: editValue,
      completed: false
    }
    // Dispatch action to handle edit submission
    dispatch(handleEditSubmit(editedObj))
  }

  return (
    <>
      {editFormVisibility === false ? ( // Normal add todo form
        <form className='form-group custom-form' onSubmit={handleSubmit}>
          <label className='text-2xl'>Add your todo-items</label>
          <div className='input-and-btn'>
            <input
              type="text"
              placeholder='Enter your todo'
              className='form-control'
              required
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
            />
            <button type="submit" className='btn btn-secondary btn-md'><IoIosAddCircle /></button>
          </div>
        </form>
      ) : ( // Update todo form
        <form className='form-group custom-form' onSubmit={editSubmit}>
          <label>Update your todo-items</label>
          <div className='input-and-btn'>
            <input
              type="text"
              className='form-control'
              required
              value={editValue || ""}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button type="submit" className='btn btn-secondary btn-md'>UPDATE</button>
          </div>
          {/* Button to go back to normal view */}
          <button type="button" className='btn btn-primary btn-md back-btn' onClick={cancelUpdate}>BACK</button>
        </form>
      )}
    </>
  )
}
