import { CATEGORIES } from 'pages/Recipes/constant'
import React from 'react'
import ListSingle from 'components/List/ListSingle'
import CardCategory from './CardCategory'

export default () => {
  return (
    <ListSingle name="Bộ sưu tập" showMore={false}>
      {CATEGORIES.map(item => (
        <CardCategory
          key={item.title}
          image={item.image}
          title={item.title}
          to={`/category/${item.code}`}
        />
      ))}
    </ListSingle>
  )
}
