import React from 'react'
import { useSelector } from 'react-redux'
import CardRecipe from 'components/CardRecipe'
import ListSingle from 'components/List/ListSingle'

export default () => {
  const items = useSelector(state => state.Recipe.latestRecipe)

  return (
    <ListSingle name="Mới cập nhật" link="/recipes/latest">
      {items &&
        items.length > 0 &&
        items.map(item => (
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
    </ListSingle>
  )
}
