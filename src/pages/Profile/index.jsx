import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import AnotherProfile from './components/anotherProfile'
import MyProfile from './components/myProfile'
import { GetAnotherProfile, SetProfileTab } from './redux/actions'

export default props => {
  const params = useParams()
  const { username } = params
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (history.location.state && history.location.state.from === '/') {
      dispatch(SetProfileTab.get({ tab: 2, page: 1 }))
    } else {
      dispatch(SetProfileTab.get({ tab: 0, page: 1 }))
    }
    dispatch(GetAnotherProfile.get(username))
  }, [username, user])

  if (user && user.username === username) {
    return <MyProfile username={username} />
  }

  return <AnotherProfile username={username} />
}
