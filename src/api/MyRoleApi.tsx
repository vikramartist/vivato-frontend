import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRoleRequest = {
  userId?: string
  email?: string
  name?: string
  fullAddress: string
  requestedRole?: string
  currentRole?: string
  status?: "pending" | "approved" | "declined"
  reason: string
  documents: boolean
  feedback?: string
}

type GetRoleRequest = {
  exists: boolean
  request?: {
    id: string
    status: "pending" | "approved" | "declined"
    requestedRole?: string
    currentRole?: string
    fullAddress: string
    documents: boolean
    feedback?: string
    createdAt?: Date
  }
}

export const useGetRoleRequest = () => {
  const { getAccessTokenSilently } = useAuth0()
  const getRoleRequest = async (): Promise<GetRoleRequest> => {
    const accesstoken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/role-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Error getting the role request")
    }

    const data: GetRoleRequest = await response.json()
    return data
  }

  const { data: getRole } = useQuery("role-request", getRoleRequest, {
    refetchOnWindowFocus: true,
    staleTime: 0,
    refetchInterval: (query) => {
      return query?.request?.status === "pending" &&
        query.request.currentRole !== "Owner"
        ? 15000
        : false
    },
  })

  return { getRole }
}

export const useCreateRoleRequest = () => {
  const { getAccessTokenSilently } = useAuth0()
  const createRoleRequest = async (roleRequestData: CreateUserRoleRequest) => {
    const accesstoken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/role-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(roleRequestData),
    })

    if (!response.ok) {
      throw new Error("Error while raising role change request!")
    }

    return await response.json()
  }

  const queryClient = useQueryClient()

  const { mutateAsync: createRequest, isLoading } = useMutation(
    createRoleRequest,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("role-request")
        toast.success("Request for role change Successfull")
      },
      onError: () => {
        toast.error("Request role Change request Failed")
      },
    }
  )

  return { createRequest, isLoading }
}
