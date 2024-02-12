import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/UserSlice';

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handler = async()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res = await fetch('https://mern-estate10.onrender.com/api/auth/google',{
                method : 'POST',
                headers : {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    avatar : result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <button type='button' className='bg-red-800 text-white p-2 rounded-md hover:opacity-90'
    onClick={handler}
    >Google</button>
  )
}

export default OAuth