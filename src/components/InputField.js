import React from 'react'

function InputField({onAddItem = f => f, isHintVisible = false}) {
  const inputRef = React.useRef()
  const onAddClick = () => {
    if(inputRef.current) {
      onAddItem(inputRef.current.value)
      inputRef.current.value = ''
    }
  }
  return (
    <div className="app__input-field-box">
      <span className={isHintVisible ? "app__input-hint opened":"app__input-hint"}>
        Please use from 5 to 40 characters to describe your todo item
      </span>
      <div onClick={onAddClick} className='app__input-status-wrapper'>
        <span className="app__input-status-icon"></span>
      </div>
      <input ref={inputRef} className="app__input-field" type="text" name="todo-input" placeholder="Create a new todo..."></input>
    </div>
  )
}

export default InputField
