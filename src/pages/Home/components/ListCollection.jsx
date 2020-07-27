import React, { useState } from 'react'
import ListSingle from '../../../components/List/ListSingle'
import CardCategory from './CardCategory'

export default () => {
  const [items] = useState([
    {
      title: 'Món Hàn',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*',
      to: '/#/recipes'
    },
    {
      title: 'Món Nhật',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*',
      to: '/#/recipes'
    },
    {
      title: 'Món Trung',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*',
      to: '/#/recipes'
    },
    {
      title: 'Món Âu',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*',
      to: '/#/recipes'
    }
  ])

  return (
    <ListSingle name="Bộ sưu tập" link="/">
      {items.map(item => (
        <CardCategory
          key={item.title}
          image={item.image}
          title={item.title}
          to={item.to}
        />
      ))}
    </ListSingle>
  )
}
