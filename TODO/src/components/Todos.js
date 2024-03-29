import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather/trash';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { removeTodo, handleCheckbox } from '../redux/todoapp/actions';

export const Todos = ({ handleEditClick, editFormVisibility }) => {
  // Dispatch function to dispatch an action
  const dispatch = useDispatch();

  // Getting todos from the store
  const todos = useSelector((state) => state.operationsReducer);

  // Map over todos array and render each todo item
  return todos.map((todo) => (
    <div key={todo.id} className='todo-box p-3'>
      <div className='content'>
        {/* Render checkbox only if edit form is not visible */}
        {editFormVisibility === false && (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(handleCheckbox(todo.id))}
          />
        )}
        {/* Render todo text with decoration based on completion status */}
        <p style={todo.completed === true ? { textDecoration: 'line-through' } : {}}>
          {todo.todo}
        </p>
      </div>
      <div className='actions-box'>
        {/* Render edit and delete icons only if edit form is not visible */}
        {editFormVisibility === false && (
          <>
            <span onClick={() => handleEditClick(todo)}><Icon icon={edit2} /></span>
            <span onClick={() => dispatch(removeTodo(todo.id))}><Icon icon={trash} /></span>
          </>
        )}
      </div>
    </div>
  ));
};
