import { useCreateRoleRequest, useGetRoleRequest } from "@/api/MyRoleApi"
import RoleRequest from "./role-request"
import type { RoleRequestType } from "@/type"

const RoleRequestPage = () => {
  const { isLoading, createRequest } = useCreateRoleRequest()

  const { getRole } = useGetRoleRequest()

  return (
    <RoleRequest
      isLoading={isLoading}
      onRequest={createRequest}
      roleStatus={getRole?.request?.status as string}
      isExisting={getRole?.exists as boolean}
      roleData={getRole?.request as RoleRequestType}
    />
  )
}

export default RoleRequestPage
