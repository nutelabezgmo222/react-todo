import React from 'react'

let sortArr = [
  {
    sortBy: 'SORT_ALL',
    text: 'All',
    active: true
  },
  {
    sortBy: 'SORT_ACTIVE',
    text: 'Active',
    active: false
  },
  {
    sortBy: 'SORT_COMPLETED',
    text: 'Completed',
    active: false
  }
]

const ListSort = ({itemsCount = 0, onSortClick = f=>f, onRemoveClick = f=>f}) =>{
  const onSortItemClick = (sortType) => {
    sortArr = sortArr.map((sort, i) => {
      if(sort.sortBy === sortType) {
        return {
          ...sort,
          active: true
        }
      }else {
        return {
          ...sort,
          active: false
        }
      }
    })
    onSortClick(sortType)
  }
  return (
    <div className="app__todo-sort-box">
      <p className="app__todo-count">{itemsCount} items left</p>
      <ul className="app__todo-sort-list">
        {
          sortArr.map((sort, i) => {
            return <li  className={sort.active? 'active' : ''}
                        onClick={()=>onSortItemClick(sort.sortBy)} key={`${sort.text}_${i}`}>
                        {sort.text}
                  </li>
          })
        }
      </ul>
      <p onClick={onRemoveClick} className="app__todo-clear">Clear Completed</p>
    </div>
  )
}

export default ListSort
