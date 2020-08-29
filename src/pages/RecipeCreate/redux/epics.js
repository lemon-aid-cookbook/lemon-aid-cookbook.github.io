import { GlobalModalSetup } from 'components/GlobalModal'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import {
  CommentPost,
  CommentPostFailed,
  CommentPostSuccess,
  CreateRecipe,
  CreateRecipeFailed,
  CreateRecipeSuccess,
  DeleteComment,
  DeleteCommentFailed,
  DeleteCommentSuccess,
  DeleteRecipe,
  DeleteRecipeFailed,
  DeleteRecipeSuccess,
  GetDetailRecipe,
  GetDetailRecipeFailed,
  GetDetailRecipeSuccess,
  LikePost,
  LikePostFailed,
  LikePostSuccess,
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess,
  UnlikePost,
  UnlikePostFailed,
  UnlikePostSuccess,
  UpdateRecipe,
  UpdateRecipeFailed,
  UpdateRecipeSuccess,
  SearchLatestRecipes,
  SearchLatestRecipesSuccess,
  SearchLatestRecipesFailed,
  SearchFavoriteRecipes,
  SearchFavoriteRecipesSuccess,
  SearchFavoriteRecipesFailed,
  GetFollowingPosts,
  GetFollowingPostsSuccess,
  GetFollowingPostsFailed
} from './actions'
import { push, goBack } from 'connected-react-router'

const createRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(CreateRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'post/create',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              push(`/profile/${store.getState().Auth.user.username}`)
            )
            return CreateRecipeSuccess.get(result.data)
          }
          return CreateRecipeFailed.get(result)
        }),
        catchError(error => {
          return CreateRecipeFailed.get(error)
        })
      )
    })
  )

const deleteRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'post/remove',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            history.replace('/')
            return DeleteRecipeSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data.err
          )
          return DeleteRecipeFailed.get(result)
        }),
        catchError(error => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            'Đã có lỗi xả ra khi xóa bài đăng'
          )
          return DeleteRecipeFailed.get(error)
        })
      )
    })
  )

const commentRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(CommentPost.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user/comment',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ postId: action.payload.postId })
            )
            return CommentPostSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data.err
          )
          return CommentPostFailed.get(result)
        }),
        catchError(error => {
          return CommentPostFailed.get(error)
        })
      )
    })
  )

const deleteCommentEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteComment.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user/deletecomment',
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ postId: action.payload.postId })
            )
            return DeleteCommentSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data.err
          )
          return DeleteCommentFailed.get(result)
        }),
        catchError(error => {
          return DeleteCommentFailed.get(error)
        })
      )
    })
  )

const updateRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `post/update/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetDetailRecipe.get({ postId: action.payload.id }))
            store.dispatch(goBack())
            return UpdateRecipeSuccess.get(result.data)
          }
          return UpdateRecipeFailed.get(result)
        }),
        catchError(error => {
          return UpdateRecipeFailed.get(error)
        })
      )
    })
  )

const getDetailRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(GetDetailRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `post/getPost/${action.payload.postId}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetDetailRecipeSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data.err,
            MODAL_TYPE.NORMAL,
            () => history.replace('/')
          )
          return GetDetailRecipeFailed.get(result)
        }),
        catchError(error => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            'Đã có lỗi xảy ra hoặc công thức không tồn tại. Quay về trang chủ?',
            MODAL_TYPE.NORMAL,
            () => history.replace('/')
          )
          return GetDetailRecipeFailed.get(error)
        })
      )
    })
  )

const searchRecipesEpic$ = action$ =>
  action$.pipe(
    ofType(SearchRecipes.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'post/search',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SearchRecipesSuccess.get(result.data)
          }
          return SearchRecipesFailed.get(result)
        }),
        catchError(error => {
          return SearchRecipesFailed.get(error)
        })
      )
    })
  )

const searchLatestRecipesEpic$ = action$ =>
  action$.pipe(
    ofType(SearchLatestRecipes.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'post/search',
        param: { sort: 'latest', limit: 4, page: 1 }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SearchLatestRecipesSuccess.get(result.data)
          }
          return SearchLatestRecipesFailed.get(result)
        }),
        catchError(error => {
          return SearchLatestRecipesFailed.get(error)
        })
      )
    })
  )

const searchFavoriteRecipesEpic$ = action$ =>
  action$.pipe(
    ofType(SearchFavoriteRecipes.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'post/search',
        param: { sort: 'common', limit: 4, page: 1 }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SearchFavoriteRecipesSuccess.get(result.data)
          }
          return SearchFavoriteRecipesFailed.get(result)
        }),
        catchError(error => {
          return SearchFavoriteRecipesFailed.get(error)
        })
      )
    })
  )

const likePostEpic$ = action$ =>
  action$.pipe(
    ofType(LikePost.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user/likepost',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ postId: action.payload.postId })
            )
            return LikePostSuccess.get(result.data)
          }
          return LikePostFailed.get(result)
        }),
        catchError(error => {
          return LikePostFailed.get(error)
        })
      )
    })
  )

const unlikePostEpic$ = action$ =>
  action$.pipe(
    ofType(UnlikePost.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user/unlikepost',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ postId: action.payload.postId })
            )
            return UnlikePostSuccess.get(result.data)
          }
          return UnlikePostFailed.get(result)
        }),
        catchError(error => {
          return UnlikePostFailed.get(error)
        })
      )
    })
  )

const getFollowingPostEpic$ = action$ =>
  action$.pipe(
    ofType(GetFollowingPosts.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'post/getPostsByTabs',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetFollowingPostsSuccess.get(result.data)
          }
          return GetFollowingPostsFailed.get(result)
        }),
        catchError(error => {
          return GetFollowingPostsFailed.get(error)
        })
      )
    })
  )

export const recipeEpics = combineEpics(
  createRecipeEpic$,
  getDetailRecipeEpic$,
  likePostEpic$,
  unlikePostEpic$,
  updateRecipeEpic$,
  searchRecipesEpic$,
  deleteRecipeEpic$,
  commentRecipeEpic$,
  deleteCommentEpic$,
  searchLatestRecipesEpic$,
  searchFavoriteRecipesEpic$,
  getFollowingPostEpic$
)
