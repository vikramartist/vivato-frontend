import { useCreateRoleRequest, useGetRoleRequest } from "@/api/MyRoleApi"
import RoleRequest from "./role-request"

const RoleRequestPage = () => {
  const { isLoading, createRequest } = useCreateRoleRequest()

  const { getRole } = useGetRoleRequest()

  return (
    <RoleRequest
      isLoading={isLoading}
      onRequest={createRequest}
      roleStatus={getRole?.request?.status as string}
      isExisting={getRole?.exists as boolean}
    />
  )
}

export default RoleRequestPage
