import { CircularProgress, Container } from '@material-ui/core'
import { GetDetailRecipe } from 'pages/RecipeCreate/redux/actions'
import React, { useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AppHeader from '../../components/Header/AppHeader'
import PostComments from './components/PostComments'
import PostDetails from './components/PostDetails'
import PostHeader from './components/PostHeader'

export default props => {
  const params = useParams()
  const { id } = params // Recipe ID (The UUID was returned from API)
  const dispatch = useDispatch()
  const post = useSelector(state => state.Recipe.detailRecipe)

  useEffect(() => {
    dispatch(GetDetailRecipe.get({ postId: id }))
  }, [])

  if (!post || id !== post.id) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="md" style={{ textAlign: 'center' }}>
          <CircularProgress style={{ marginTop: 64 }} />
        </Container>
      </>
    )
  }

  return (
    <>
      <AppHeader />
      <MetaTags>
        <title>{post.title}</title>
        {post.description && (
          <meta name="description" content={post.description} />
        )}
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.avatar} />
      </MetaTags>
      <Container maxWidth="md">
        <PostHeader
          thumbnail={post.avatar}
          title={post.title}
          owner={post.author}
          likes={post.likes}
          postId={post.id}
          rating={post.likes}
        />
        <PostDetails
          cookTime={post.cookingTime}
          ration={post.ration}
          categories={post.categories}
          level={post.difficultLevel}
          materials={post.ingredients}
          steps={post.content}
          description={post.description}
        />
        <hr style={{ margin: '2rem 0' }} />
        <PostComments comments={post.Comments} postId={post.id} />
      </Container>
    </>
  )
}
