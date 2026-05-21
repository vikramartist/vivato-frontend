import { socket } from "@/socket"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

const SocketInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const setupSocket = async () => {
      if (!isAuthenticated) return

      const authToken = await getAccessTokenSilently()

      socket.auth = { authToken }

      socket.connect()
    }

    setupSocket()

    const handleConnect = () => {
      socket.emit("rider-online")
    }

    socket.on("connect", handleConnect)

    return () => {
      socket.off("connect", handleConnect)
      socket.disconnect()
    }
  }, [isAuthenticated, getAccessTokenSilently])

  return children
}

export default SocketInitializer
