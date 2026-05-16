import { useCreateMyUser } from "@/api/MyUserApi"
import { socket } from "@/socket"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const { createUser } = useCreateMyUser()
  const navigate = useNavigate()

  const hasCreatedUser = useRef(false)

  useEffect(() => {
    const syncUser = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        await createUser({
          auth0Id: user?.sub,
          email: user?.email,
          profile_pic: user?.picture
            ? user?.picture
            : "https://cdn.pixabay.com/photo/2024/05/01/00/37/tiger-8731137_1280.jpg",
          contact: user?.phone_number as string,
        })

        const authToken = await getAccessTokenSilently()

        socket.auth = {
          authToken,
        }

        //socket connection
        socket.connect()

        socket.emit("rider-online")
        hasCreatedUser.current = true
      }
      navigate("/")
    }
    syncUser()
  }, [createUser, user, navigate, getAccessTokenSilently])

  return <>Loading...</>
}

export default AuthCallbackPage
