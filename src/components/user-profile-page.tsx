import {
  useGetMyUser,
  useUpdateMyUser,
  useUpateMyRiderProfile,
  useGetRiderProfile,
} from "@/api/MyUserApi"
import UserProfileForm from "@/forms/UserProfileForm/user-profile-form"
import { Spinner } from "./ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import RoleProfileForm from "@/forms/UserProfileForm/role-profile-form"

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()
  const { isLoading: isUpdateLoading, updateUser } = useUpdateMyUser()
  const { isLoading: isRiderUpdateLoading, updateRiderProfile } =
    useUpateMyRiderProfile()
  const { getRider, isLoading: isGetRiderLoading } = useGetRiderProfile()

  if (isGetLoading || isRiderUpdateLoading || isGetRiderLoading) {
    return <Spinner />
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>
  }

  if (!updateRiderProfile) {
    return <span>Unable to load rider profile</span>
  }

  return (
    <Tabs className="w-full" defaultValue="main-profile">
      <TabsList className="mx-auto w-[90%] gap-2 md:w-[50%]">
        <TabsTrigger
          className="text-[9px] tracking-wide md:text-sm"
          value="main-profile"
        >
          My Profile
        </TabsTrigger>
        {currentUser.role === "Rider" && (
          <TabsTrigger
            className="text-[9px] tracking-wide md:text-sm"
            value={`rider-profile`}
          >
            Rider Profile
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent
        value="main-profile"
        className="pg-10 space-y-2 rounded-lg px-2"
      >
        <UserProfileForm
          currentUser={currentUser}
          onSave={updateUser}
          isLoading={isUpdateLoading}
        />
      </TabsContent>
      {currentUser.role === "Rider" && (
        <TabsContent
          value={`rider-profile`}
          className="pg-10 space-y-2 rounded-lg px-2"
        >
          <RoleProfileForm
            onSave={updateRiderProfile}
            isLoading={isRiderUpdateLoading}
            buttonText="Update Rider"
            userName={currentUser.name}
            currentRider={getRider}
          />
        </TabsContent>
      )}
    </Tabs>
  )
}

export default UserProfilePage
