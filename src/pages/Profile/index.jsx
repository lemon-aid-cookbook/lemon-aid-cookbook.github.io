import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AnotherProfile from './components/anotherProfile'
import MyProfile from './components/myProfile'
import { GetAnotherProfile, SetProfileTab } from './redux/actions'

export default props => {
  const params = useParams()
  const { username } = params
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(SetProfileTab.get({ tab: 0, page: 1 }))
    dispatch(GetAnotherProfile.get(username))
  }, [username])

  if (user && user.username === username) {
    return <MyProfile username={username} />
  }

  return <AnotherProfile username={username} />
}
