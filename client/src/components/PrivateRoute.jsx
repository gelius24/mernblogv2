import {useSelector} from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'
// navigate is a component useNavigate is a hook.
// Outlet is children of a Route
export default function PrivateRoute() {
  const {currentUser} = useSelector(state => state.user)
  return (
    currentUser ? <Outlet /> : <Navigate to='/sign-in' />
  )
}