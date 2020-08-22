import { CircularProgress, Container } from "@material-ui/core";
import { GetDetailRecipe } from "pages/RecipeCreate/redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/Header/AppHeader";
import PostComments from "./components/PostComments";
import PostDetails from "./components/PostDetails";
import PostHeader from "./components/PostHeader";

export default (props) => {
  const params = useParams();
  const { id } = params; // Recipe ID (The UUID was returned from API)
  const dispatch = useDispatch();
  const post = useSelector((state) => state.Recipe.detailRecipe);

  useEffect(() => {
    dispatch(GetDetailRecipe.get({ postId: id }));
  }, []);

  const [recipe] = useState({
    title: "Salad nhiệt đới",
    thumbnail:
      "https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg",
    tags: ["Công thức", "Salad", "Salad nhiệt đới"],
    owner: {
      name: "Matilda Brown",
      avatar:
        "https://www.takadada.com/wp-content/uploads/2019/07/avatar-anime-nu-cho-facebook-73.jpg",
    },
    readyTime: 10, // mins
    cookTime: 40, // mins
    ration: 4, // mins
    rating: 30, // person
    materials: [
      {
        name: "Cá ngừ",
        gram: 200,
      },
      {
        name: "Xà lách",
        gram: 300,
      },
      {
        name: "Bắp cải tím",
        gram: 200,
      },
      {
        name: "Cà chua bi",
        gram: 200,
      },
      {
        name: "Gia vị",
        gram: 0,
      },
    ],
    steps: [
      {
        name: "Sơ chế nguyên liệu",
        todo: [
          "Rửa sạch xà lách, cải tím, cà chua bi...",
          "Xà lách cắt khúc ngắn.",
          "Cải tím cắt sợi.",
        ],
      },
      {
        name: "Chế biến",
        todo: [
          "Làm sốt trộn: Cho 50gr dấm, 30gr dầu oliu, 20gr mayonaise, 5gr muối, 25gr đường, 2gr tiêu rồi đánh tan đều, thêm tương ớt nếu thích vị cay (có thể bỏ vào máy xay).",
        ],
      },
    ],
    comments: [
      {
        username: "stevenblack1717",
        avatar:
          "https://www.takadada.com/wp-content/uploads/2019/07/avatar-anime-nu-cho-facebook-73.jpg",
        text: "Chu mi nga",
      },
    ],
  });

  if (!post || id !== post.id) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <CircularProgress style={{ marginTop: 64 }} />
        </Container>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <Container maxWidth="md">
        <PostHeader
          thumbnail={post.avatar}
          title={post.title}
          owner={post.author}
          likes={post.likes}
          postId={post.id}
        />
        <PostDetails
          cookTime={post.cookingTime}
          ration={recipe.ration}
          rating={post.likes}
          materials={post.ingredients}
          steps={post.content}
        />
        <hr style={{ margin: "2rem 0" }} />
        <PostComments comments={post.Comments} />
      </Container>
    </>
  );
};
