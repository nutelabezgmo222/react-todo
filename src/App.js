import React from 'react'
import './scss/all.scss'
import {Header, InputField, List} from './components'

const App = () => {
  const [todoItems, setTodoItems] = React.useState([])
  const [isHintVisible, setHintVisibility] = React.useState(false)
  const [themeColor, setThemeColor] = React.useState('dark')

  React.useEffect(()=>{
    const newTodoList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
    setTodoItems(newTodoList)
  }, [])

  const handleToggleThemeColor = () => {
    if(themeColor === 'dark'){
      setThemeColor('light')
    }else {
      setThemeColor('dark')
    }
  }
  const handleAddItem = (text) => {
    if(text.length > 5 && text.length < 40) {
      const newTodoItems = [
        ...todoItems,
        {
          isCompleted: false,
          text,
          id: (Math.random() * 1e18).toString(26),
          order: todoItems.length,
        }
      ]
      localStorage.setItem('list', JSON.stringify(newTodoItems))
      setTodoItems(newTodoItems)
      setHintVisibility(false)
    } else {
      setHintVisibility(true)
    }
  }
  const handleToggleCompletedItem = (id) => {
    const newTodoItems = todoItems.map((item) => {
      if(item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      }else {
        return item
      }
    })
    localStorage.setItem('list', JSON.stringify(newTodoItems))
    setTodoItems(newTodoItems)
  }
  const handleRemoveCompletedItems = () => {
    let newTodoItems = todoItems.filter((item)=> {
      return item.isCompleted ? '' : item
    })
    newTodoItems = newTodoItems.map((item, i) => {
      return {...item, order: i}
    })
    localStorage.setItem('list', JSON.stringify(newTodoItems))
    setTodoItems(newTodoItems)
  }
  const handleRemoveItem = (id) => {
    let newTodoItems = todoItems.filter((item) => {
      return item.id === id ? '' : item
    })
    newTodoItems = newTodoItems.map((item, i) => {
      return {...item, order: i}
    })
    localStorage.setItem('list', JSON.stringify(newTodoItems))
    setTodoItems(newTodoItems)
  }
  const handleChangeOrder = (draggitem, droppItem) => {
    let newItems = todoItems.slice()
    const draggedObj = newItems.splice(draggitem, 1)[0]
    newItems.splice(droppItem, 0, draggedObj)
    localStorage.setItem('list', JSON.stringify(newItems))
    setTodoItems(newItems)
  }
  return (
    <main className={themeColor==='dark' ? 'app' : 'app light-version'}>
      <div className="wrapper">
        <div className="todo-box">
          <Header onToggleTheme={handleToggleThemeColor} />
          <InputField isHintVisible={isHintVisible} onAddItem = {handleAddItem}/>
          <List 
              onChangeOrder={handleChangeOrder}
              onRemoveCompletedItems={handleRemoveCompletedItems} onCompleteItem={handleToggleCompletedItem} 
              items={todoItems} onRemoveItem={handleRemoveItem} />
          <p className="hint">Drag and drop to reorder list</p>
        </div>
      </div>
    </main>
  );
}

export default App;
