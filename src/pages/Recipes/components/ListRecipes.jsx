import React from 'react'
import CardRecipe from 'components/CardRecipe'
import ListMultiple from 'components/List/ListMultiple'

export default props => {
  const { list } = props

  return (
    <ListMultiple>
      {list &&
        list.length > 0 &&
        list.map(item => (
          <CardRecipe
            key={item.id}
            title={item.title}
            image={item.avatar}
            to={item.id}
            time={item.cookingTime}
            star={item.numberOfLikes}
            owner={item.User}
            createdDate={item.createdAt}
          />
        ))}
    </ListMultiple>
  )
}
