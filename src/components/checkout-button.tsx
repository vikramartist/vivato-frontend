import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingButton from "./loading-button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import UserProfileForm, {
  type UserFormData,
} from "@/forms/UserProfileForm/user-profile-form"
import { useGetMyUser } from "@/api/MyUserApi"
import { BaggageClaim } from "lucide-react"

type Props = {
  onCheckout: (userFormData: UserFormData) => void
  disabled: boolean
  isLoading: boolean
}

const CheckoutButton = ({ disabled, onCheckout, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0()

  const { pathname } = useLocation()
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

  const onLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: pathname },
    })
  }

  if (!isAuthenticated) {
    return (
      <Button
        onClick={onLogin}
        className="flex-1 bg-orange-500 text-[10px] md:text-sm"
      >
        Log in to checkout
      </Button>
    )
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="bg-orange-500 text-[10px] md:text-sm"
        >
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-106.25 bg-gray-50 md:min-w-175">
        <DialogHeader>
          <DialogTitle className="text-[14px] md:text-[18px]">
            <BaggageClaim className="text-orange-500" />
          </DialogTitle>
        </DialogHeader>
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          buttonText="Continue to payment"
          title="Confirm Delivery Details"
        />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton
