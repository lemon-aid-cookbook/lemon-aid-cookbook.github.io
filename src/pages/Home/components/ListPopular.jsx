import React, { useState } from 'react'
import ListSingle from '../../../components/List/ListSingle'
import CardRecipe from '../../../components/CardRecipe'

export default () => {
  const [items] = useState([
    {
      title: 'Beefsteak',
      image:
        'https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg',
      to: '/',
      time: '120 phút',
      star: 5,
      owner: 'Maria Muahaha',
      avatar: '',
      createdDate: 'September 14, 2016'
    },
    {
      title: 'Beefsteak',
      image:
        'https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg',
      to: '/',
      time: '120 phút',
      star: 5,
      owner: 'Maria Muahaha',
      avatar: '',
      createdDate: 'September 14, 2016'
    },
    {
      title: 'Beefsteak',
      image:
        'https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg',
      to: '/',
      time: '120 phút',
      star: 5,
      owner: 'Maria Muahaha',
      avatar: '',
      createdDate: 'September 14, 2016'
    },
    {
      title: 'Beefsteak',
      image:
        'https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg',
      to: '/',
      time: '120 phút',
      star: 5,
      owner: 'Maria Muahaha',
      avatar: '',
      createdDate: 'September 14, 2016'
    }
  ])

  return (
    <ListSingle name="Phổ biến" link="/">
      {items.map(item => (
        <CardRecipe
          key={item.title}
          title={item.title}
          image={item.image}
          to={item.to}
          time={item.time}
          star={item.star}
          owner={item.owner}
          avatar={item.avatar}
          createdDate={item.createdDate}
        />
      ))}
    </ListSingle>
  )
}
