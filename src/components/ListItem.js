import React from 'react'
const ListItem = (props) => {
  const {isCompleted, text, onCompleteClick, id, onRemoveClick, onDragStart, onDragDrop } = props
  const dragEndHandler = (e) => {
    e.target.closest('.todo-item').style.transform = 'rotate(0deg)'
  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.closest('.todo-item').style.transform = 'rotate(2deg)'
  } 
  const dragDropHandler = (e, id) => {
    e.preventDefault()
    e.target.closest('.todo-item').style.transform = 'rotate(0deg)'
    onDragDrop(id)
  }
  return (
    <li draggable={true} className={isCompleted ? "todo-item completed" : "todo-item"}
        onDragStart = {(e) => onDragStart(id)} onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd = {(e) => dragEndHandler(e)} onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dragDropHandler(e, id)}
    >
      <div onClick={() => onCompleteClick(id)}
        className={isCompleted ? 'todo-item__status-wrapper completed' : 'todo-item__status-wrapper'}>
        <span className="todo-item__status-icon"></span>
      </div>
      <span className="todo-item__text">{text}</span>
      <span onClick={() => onRemoveClick(id)} className="todo-item__remove"></span>
    </li>
  )
}

export default ListItem
