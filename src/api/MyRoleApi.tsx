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

type RoleRequest = {
  id: string
  status: "pending" | "approved" | "declined"
  requestedRole?: string
  currentRole?: string
  fullAddress: string
  documents: boolean
  feedback?: string
  createdAt?: Date
  reason: string
}

type GetRoleRequest = {
  exists: boolean
  request?: RoleRequest
}

type RequestBody = {
  _id: string
  userId: {
    _id: string
    name: string
    email: string
    role: string
  }
  requestedRole: string
  currentRole: string
  status: string
  reason: string
  userFeedback: string
  address: string
  documents: boolean
  createdAt: Date
  updatedAt: Date
}

type AllRoleRequests = {
  data: [RequestBody]
}

type ApproveOrRejectRequestInput = {
  requestId: string
  comments: string
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

export const useGetAllRoleRequests = () => {
  const { getAccessTokenSilently } = useAuth0()
  const getAllRoleRequests = async (): Promise<AllRoleRequests> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/my/role-requests/requests`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error("Error while getting all role requests")
    }

    const data = await response.json()

    return data
  }

  const { data: getAllRequests, isLoading } = useQuery(
    "all-role-request",
    getAllRoleRequests,
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      refetchInterval: (query) => {
        return query?.data.some((data) => data.status === "pending")
          ? 5000
          : false
      },
    }
  )

  return { getAllRequests, isLoading }
}

export const useApproveRoleRequest = () => {
  const { getAccessTokenSilently } = useAuth0()
  const approveRoleRequest = async ({
    requestId,
    comments,
  }: ApproveOrRejectRequestInput) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/my/role-requests/${requestId}/approve`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ comments }),
      }
    )

    if (!response.ok) {
      throw new Error("Error while approving role request!")
    }

    return response.json()
  }

  const queryClient = useQueryClient()

  const { mutateAsync: approveRequest, isLoading } = useMutation({
    mutationFn: approveRoleRequest,
    onSuccess: () => {
      toast.success("Role request approved")
      queryClient.invalidateQueries(["role-request"])
    },
    onError: () => {
      toast.error("Failed to approve request")
    },
  })

  return { approveRequest, isLoading }
}

export const useRejectRoleRequest = () => {
  const { getAccessTokenSilently } = useAuth0()
  const rejectRoleRequest = async ({
    requestId,
    comments,
  }: ApproveOrRejectRequestInput) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(
      `${API_BASE_URL}/api/my/role-requests/${requestId}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ comments }),
      }
    )

    if (!response.ok) {
      throw new Error("Error while rejecting role request!")
    }

    return response.json()
  }

  const queryClient = useQueryClient()

  const { mutateAsync: rejectRequest, isLoading } = useMutation({
    mutationFn: rejectRoleRequest,
    onSuccess: () => {
      toast.success("Role request rejected")
      queryClient.invalidateQueries(["role-request"])
    },
    onError: () => {
      toast.error("Failed to reject request")
    },
  })

  return { rejectRequest, isLoading }
}
