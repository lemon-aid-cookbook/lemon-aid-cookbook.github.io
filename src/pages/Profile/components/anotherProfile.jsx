import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Typography
} from '@material-ui/core'
import { GlobalModalSetup } from 'components/GlobalModal'
import ListRecipes from 'pages/Recipes/components/ListRecipes'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LIMIT_ITEMS, MODAL_TYPE } from 'ultis/functions'
import AppHeader from '../../../components/Header/AppHeader'
import { profileStyles, TAB_TYPES } from '../constants'
import {
  Follow,
  GetProfilePost,
  SetProfileTab,
  Unfollow
} from '../redux/actions'
import FollowDialog, { FLDIALOG_TYPES } from './followDialog'
import Pagination from 'components/Pagination'
import { useMediaQuery } from 'react-responsive'

export default function AnotherProfile(props) {
  const classes = profileStyles()
  const profile = useSelector(state => state.Profile)
  const user = useSelector(state => state.Auth.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const [flDialog, setFlDialog] = useState(null)
  const followings = useSelector(state => state.Profile.userFollowings)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  const {
    profileDetail,
    tabPosts,
    totalItems,
    isLoadingRecipe,
    page,
    tab
  } = profile
  const totalPages = Math.ceil(totalItems / LIMIT_ITEMS)

  const onPageChange = index => {
    dispatch(SetProfileTab.get({ tab, page: index }))
    dispatch(
      GetProfilePost.get({
        userId: profileDetail.id,
        limit: LIMIT_ITEMS,
        page: index,
        type: TAB_TYPES[tab]
      })
    )
  }

  const follow = () => {
    if (user) {
      if (isFollow) {
        dispatch(
          Unfollow.get({ userId: user.id, followerId: profileDetail.id })
        )
      } else {
        dispatch(Follow.get({ userId: user.id, followerId: profileDetail.id }))
      }
    } else {
      GlobalModalSetup.getGlobalModalHolder().alertMessage(
        'Thông báo',
        'Bạn chưa đăng nhập. Vui lòng đăng nhập để theo dõi người dùng này.',
        MODAL_TYPE.CHOICE,
        () =>
          history.push({
            pathname: '/signin',
            state: { from: `/profile/${props.username}` }
          })
      )
    }
  }

  if (!profileDetail || profileDetail.username !== props.username) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <CircularProgress style={{ marginTop: 64 }} />
        </Container>
      </>
    )
  }

  const isFollow =
    followings && followings.some(fl => fl.user.id === profileDetail.id)

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" className={classes.root}>
        <div
          className={classes.root}
          style={!isDesktopOrLaptop ? { flexDirection: 'column' } : {}}
        >
          {isDesktopOrLaptop ? (
            <div className={classes.left}>
              <Avatar
                className={classes.large}
                src={
                  profileDetail && profileDetail.avatar
                    ? profileDetail.avatar
                    : null
                }
              />
              <Typography variant="h6" className={classes.boldText}>
                {profileDetail.username}
              </Typography>
              <Typography variant="h6" className={classes.boldText}>
                {profileDetail.Posts ? profileDetail.Posts.length : 0}
              </Typography>
              <Typography variant="body1" className={classes.grayText}>
                bài đăng
              </Typography>
              <ButtonBase
                focusRipple
                className={classes.flw}
                onClick={() => setFlDialog(FLDIALOG_TYPES.FOLLOWER)}
              >
                <Typography variant="h6" className={classes.boldText}>
                  {profileDetail.followers ? profileDetail.followers.length : 0}
                </Typography>
                <Typography variant="body1" className={classes.grayText}>
                  người theo dõi
                </Typography>
              </ButtonBase>
              <ButtonBase
                focusRipple
                className={classes.flw}
                onClick={() => setFlDialog(FLDIALOG_TYPES.FOLLOWING)}
              >
                <Typography variant="h6" className={classes.boldText}>
                  {profileDetail.followings
                    ? profileDetail.followings.length
                    : 0}
                </Typography>
                <Typography variant="body1" className={classes.grayText}>
                  đang theo dõi
                </Typography>
              </ButtonBase>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                className={classes.btnStyle}
                onClick={follow}
              >
                {isFollow ? 'Bỏ theo dõi' : 'Theo dõi'}
              </Button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  className={classes.large}
                  src={
                    profileDetail && profileDetail.avatar
                      ? profileDetail.avatar
                      : null
                  }
                />
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="h6"
                    className={classes.boldText}
                    style={{ marginTop: 0 }}
                  >
                    {profileDetail.username}
                  </Typography>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    className={classes.btnStyle}
                    style={{ marginTop: 8 }}
                    onClick={follow}
                  >
                    {isFollow ? 'Bỏ theo dõi' : 'Theo dõi'}
                  </Button>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginBottom: 20
                }}
              >
                <div className={classes.flw}>
                  <Typography variant="h6" className={classes.boldText}>
                    {profileDetail.Posts ? profileDetail.Posts.length : 0}
                  </Typography>
                  <Typography variant="body1" className={classes.grayText}>
                    bài đăng
                  </Typography>
                </div>
                <ButtonBase
                  focusRipple
                  className={classes.flw}
                  onClick={() => setFlDialog(FLDIALOG_TYPES.FOLLOWER)}
                >
                  <Typography variant="h6" className={classes.boldText}>
                    {profileDetail.followers
                      ? profileDetail.followers.length
                      : 0}
                  </Typography>
                  <Typography variant="body1" className={classes.grayText}>
                    người theo dõi
                  </Typography>
                </ButtonBase>
                <ButtonBase
                  focusRipple
                  className={classes.flw}
                  onClick={() => setFlDialog(FLDIALOG_TYPES.FOLLOWING)}
                >
                  <Typography variant="h6" className={classes.boldText}>
                    {profileDetail.followings
                      ? profileDetail.followings.length
                      : 0}
                  </Typography>
                  <Typography variant="body1" className={classes.grayText}>
                    đang theo dõi
                  </Typography>
                </ButtonBase>
              </div>
            </div>
          )}

          <div className={classes.right}>
            <Typography variant="h6" className={classes.boldText}>
              Danh sách bài đăng
            </Typography>
            {isLoadingRecipe || profileDetail.username !== props.username ? (
              <CircularProgress className={classes.loading} />
            ) : tabPosts && tabPosts.length > 0 ? (
              <>
                <ListRecipes list={tabPosts} />
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={onPageChange}
                />
              </>
            ) : (
              <Typography variant="body1" className={classes.emptyText}>
                Người dùng này chưa đăng công thức nấu ăn nào.
              </Typography>
            )}
          </div>
        </div>
      </Container>
      <FollowDialog
        open={flDialog != null}
        type={flDialog}
        value={
          flDialog === FLDIALOG_TYPES.FOLLOWING
            ? profileDetail.followings
            : profileDetail.followers
        }
        onClose={() => setFlDialog(null)}
        title={
          flDialog === FLDIALOG_TYPES.FOLLOWING ? 'Đang theo dõi' : 'Theo dõi'
        }
      />
    </>
  )
}
