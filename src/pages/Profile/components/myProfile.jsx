import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import Pagination from 'components/Pagination'
import ListRecipes from 'pages/Recipes/components/ListRecipes'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LIMIT_ITEMS } from 'ultis/functions'
import AppHeader from '../../../components/Header/AppHeader'
import { profileStyles, TAB_TYPES } from '../constants'
import { GetProfilePost, SetProfileTab } from '../redux/actions'
import AvatarDialog from './avatarDialog'
import FollowDialog, { FLDIALOG_TYPES } from './followDialog'
import UpdateInfoDialog from './updateInformation'
import { useMediaQuery } from 'react-responsive'

const tabs = ['Bài đăng', 'Yêu thích', 'Đang theo dõi']

export default function MyProfile(props) {
  const classes = profileStyles()
  const user = useSelector(state => state.Auth.user)
  const profile = useSelector(state => state.Profile)
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [src, setSrc] = useState(null)
  const [flDialog, setFlDialog] = useState(null)
  const [infoDialog, setInfoDialog] = useState(false)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  const readSrc = picture => {
    let reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onloadend = () => {
      setSrc(reader.result)
    }
  }

  const onTabChange = index => {
    dispatch(SetProfileTab.get({ tab: index, page: 1 }))
    dispatch(
      GetProfilePost.get({
        userId: user.id,
        limit: LIMIT_ITEMS,
        page: 1,
        type: TAB_TYPES[index]
      })
    )
  }

  const onPageChange = index => {
    dispatch(SetProfileTab.get({ tab, page: index }))
    dispatch(
      GetProfilePost.get({
        userId: user.id,
        limit: LIMIT_ITEMS,
        page: index,
        type: TAB_TYPES[tab]
      })
    )
  }

  const onCloseDialog = () => {
    setSrc(null)
  }

  const renderEmpty = () => {
    switch (profile.tab) {
      case 0:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa đăng công thức nấu ăn nào.
          </Typography>
        )
      case 1:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa thích công thức nấu ăn nào.
          </Typography>
        )
      case 2:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa theo dõi người nào.
          </Typography>
        )
      default:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa đăng công thức nấu ăn nào.
          </Typography>
        )
    }
  }

  const {
    profileDetail,
    tabPosts,
    totalItems,
    isLoadingRecipe,
    isLoadingAvatar,
    page,
    tab
  } = profile
  const totalPages = Math.ceil(totalItems / LIMIT_ITEMS)

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

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg">
        <div
          className={classes.root}
          style={!isDesktopOrLaptop ? { flexDirection: 'column' } : {}}
        >
          {isDesktopOrLaptop ? (
            <div className={classes.left}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={e => readSrc(e.target.files[0])}
              />
              {isLoadingAvatar ? (
                <CircularProgress className={classes.loading} />
              ) : (
                <IconButton
                  edge="end"
                  onClick={() => inputRef.current.click()}
                  color="inherit"
                >
                  <Avatar
                    className={classes.large}
                    src={
                      profileDetail && profileDetail.avatar
                        ? profileDetail.avatar
                        : null
                    }
                  />
                </IconButton>
              )}
              <Typography variant="h6" className={classes.boldText}>
                {profileDetail.username}
              </Typography>
              <Typography variant="body1" className={classes.grayText}>
                {profileDetail.email}
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
                onClick={() => setInfoDialog(true)}
              >
                Đổi mật khẩu
              </Button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type="file"
                  onChange={e => readSrc(e.target.files[0])}
                />
                {isLoadingAvatar ? (
                  <CircularProgress className={classes.loading} />
                ) : (
                  <IconButton
                    edge="end"
                    onClick={() => inputRef.current.click()}
                    color="inherit"
                  >
                    <Avatar
                      className={classes.large}
                      src={
                        profileDetail && profileDetail.avatar
                          ? profileDetail.avatar
                          : null
                      }
                    />
                  </IconButton>
                )}
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="h6"
                    className={classes.boldText}
                    style={{ marginTop: 0 }}
                  >
                    {profileDetail.username}
                  </Typography>
                  <Typography variant="body1" className={classes.grayText}>
                    {profileDetail.email}
                  </Typography>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    className={classes.btnStyle}
                    style={{ marginTop: 8 }}
                    onClick={() => setInfoDialog(true)}
                  >
                    Đổi mật khẩu
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
            <Tabs
              value={profile.tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, value) => onTabChange(value)}
              aria-label="tab recipre"
            >
              {tabs.map(item => (
                <Tab label={item} />
              ))}
            </Tabs>
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
              renderEmpty()
            )}
          </div>
        </div>
      </Container>
      <AvatarDialog open={src != null} value={src} onClose={onCloseDialog} />
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
          flDialog === FLDIALOG_TYPES.FOLLOWING
            ? 'Đang theo dõi'
            : 'Theo dõi bạn'
        }
      />
      <UpdateInfoDialog
        open={infoDialog}
        onClose={() => setInfoDialog(false)}
      />
    </>
  )
}
