import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRoleRequest = {
  userId?: string
  email?: string
  name: string
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
    currenRole?: string
    address: string
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

    return response.json()
  }

  const { data: getRole } = useQuery("role-request", getRoleRequest, {
    refetchOnWindowFocus: true,
    staleTime: 0,
    refetchInterval: (query) => {
      const data = query?.request as GetRoleRequest | undefined
      if (!data) return false

      if (data.request?.status === "approved") {
        toast.success(
          "Hooray!, You're role has been change to Owner, you can now add and own restaurants. Happy Vivatoing😉🎉🎊"
        )
        return 0
      }

      if (data.request?.status === "declined") {
        toast.warning(
          "You're request for Role Change has been Declined. Try to request after 24hrs."
        )
        return 0
      }

      return data.request?.status === "pending" ? 15000 : false
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
