import { useCreateMyUser } from "@/api/MyUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
  const { user } = useAuth0()
  const { createUser } = useCreateMyUser()
  const navigate = useNavigate()

  const hasCreatedUser = useRef(false)

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub,
        email: user.email,
        profile_pic: user.picture!
          ? user.picture!
          : "https://cdn.pixabay.com/photo/2024/05/01/00/37/tiger-8731137_1280.jpg",
        contact: user.phone_number!,
      })
      hasCreatedUser.current = true
    }
    navigate("/")
  }, [createUser, user, navigate])

  return <>Loading...</>
}

export default AuthCallbackPage
