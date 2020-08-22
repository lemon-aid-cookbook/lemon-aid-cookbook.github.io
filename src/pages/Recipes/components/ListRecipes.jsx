import React, { useState } from "react";
import ListMultiple from "../../../components/List/ListMultiple";
import CardRecipe from "../../../components/CardRecipe";

export default (props) => {
  const _items = [];
  for (let i = 0; i < 12; ++i) {
    _items.push({
      title: "Beefsteak",
      image:
        "https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg",
      to: `/#/recipe/${i}`,
      time: "120 phút",
      star: 5,
      owner: "Maria Muahaha",
      avatar:
        "https://www.takadada.com/wp-content/uploads/2019/07/avatar-anime-nu-cho-facebook-73.jpg",
      createdDate: "September 14, 2016",
    });
  }

  const [items] = useState(_items);
  const { list } = props;

  return (
    <ListMultiple>
      {list && list.length > 0
        ? list.map((item) => (
            <CardRecipe
              key={item.id}
              title={item.title}
              image={item.avatar}
              to={item.id}
              time={item.cookingTime}
              star={item.likes}
              owner={item.User}
              createdDate={item.createdAt}
            />
          ))
        : items.map((item) => (
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
    </ListMultiple>
  );
};
