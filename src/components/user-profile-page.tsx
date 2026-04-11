import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/UserProfileForm/user-profile-form"
import { Spinner } from "./ui/spinner"

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()
  const { isLoading: isUpdateLoading, updateUser } = useUpdateMyUser()

  if (isGetLoading) {
    return <Spinner />
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage
