import React from 'react'
import ListItem from './ListItem'
import ListSort from './ListSort'

const List = ({items = [], onCompleteItem = f=>f, onRemoveCompletedItems = f=>f, onRemoveItem=f=>f, onChangeOrder}) => {
  const [currentDraggId, setCurrentDraggId] = React.useState(null)
  const [sortType, setSortType] = React.useState('SORT_ALL')
  const [currentItems, setCurrentItems] = React.useState([])
  React.useEffect(()=> {
    switch(sortType) {
      case 'SORT_ALL': {
        setCurrentItems(items)
        break;
      }
      case 'SORT_ACTIVE': {
        const newItems = items.filter((item) => 
          item.isCompleted ? '' : item
        )
        setCurrentItems(newItems)
        break;
      }
      case 'SORT_COMPLETED': {
        const newItems = items.filter((item) => 
          !item.isCompleted ? '' : item
        )
        setCurrentItems(newItems)
        break;
      }
      default: 
        return
    }
  }, [items, sortType])
  const handleSortClick = (sort) => {
    setSortType(sort)
  }
  const handleDragStart = (id) => {
    setCurrentDraggId(id)
  }
  const handleDragDrop = (id) => {
    if(currentDraggId !== id) {
      const draggIndex = items.findIndex((item) => {
        return item.id === currentDraggId
      })
      const dropedIndex = items.findIndex((item) => {
        return item.id === id
      })
      onChangeOrder(draggIndex, dropedIndex)
    }
  }
  return (
    <div className="app__todo-list-box">
      <ul className="app__todo-list">
        {
          currentItems &&
          currentItems.map( (item, i) => {
            return <ListItem 
                      onDragStart={handleDragStart} onDragDrop={handleDragDrop}
                      onRemoveClick={onRemoveItem} 
                      onCompleteClick={onCompleteItem} key={i} {...item}/>
          })
        }
      </ul>
      <ListSort onRemoveClick={onRemoveCompletedItems} onSortClick={handleSortClick} itemsCount={currentItems.length} />
    </div>
  )
}

export default List
