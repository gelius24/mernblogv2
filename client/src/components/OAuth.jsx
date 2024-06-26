import {Button} from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // sign in with google using firebase OAuth functionality
  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()
    // alway ask to select an account
    provider.setCustomParameters({prompt: 'select_account'})
    // open the popup window
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      // post request to my backend to create a user in mongoDB
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        })
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // its in a form but not a submit button.
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue With Google
    </Button>
  )
}