import {
  useApproveRoleRequest,
  useGetAllRoleRequests,
  useRejectRoleRequest,
} from "@/api/MyRoleApi"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Spinner } from "../ui/spinner"
import { useState } from "react"
import { cn } from "@/lib/utils"

const Roles = () => {
  const { isLoading, getAllRequests } = useGetAllRoleRequests()
  const { approveRequest, isLoading: isApprovalLoading } =
    useApproveRoleRequest()
  const { isLoading: isRejectionLoading, rejectRequest } =
    useRejectRoleRequest()

  const [comments, setComments] = useState<Record<string, string>>({})

  if (isApprovalLoading || isRejectionLoading || isLoading) {
    return <Spinner>Loading...</Spinner>
  }

  type Submission = {
    requestId: string
    comments: string
  }

  const handleSubmission = (
    { requestId, comments }: Submission,
    submissionType: string
  ) => {
    if (submissionType === "success") {
      approveRequest({ requestId, comments })
    } else {
      rejectRequest({ requestId, comments })
    }
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <Table className="overflow-x-scroll px-2 py-1" align="left">
        <TableCaption className="text-center text-[9px] text-orange-400 md:text-sm dark:text-gray-300">
          All Role Change Requests
        </TableCaption>
        <TableHeader>
          <TableRow className="w-full">
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Role Change ID
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              User ID
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Name
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Email
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Current Role
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Requested Role
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Reason for Change
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Status
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Have all documents?
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Address
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Feedback
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              ADMIN Comments
            </TableHead>
            <TableHead className="text-[10px] tracking-tight text-orange-500 md:text-sm dark:text-white">
              Approval
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody suppressHydrationWarning>
          {getAllRequests?.data.map((request) => (
            <>
              {request.currentRole === "Owner" ||
                (request.status !== "declined" && (
                  <TableRow
                    key={`${request._id}-${request.userId}`}
                    className={cn(
                      "w-full text-[9px] md:text-sm dark:text-white"
                    )}
                  >
                    <TableCell>{request._id}</TableCell>
                    <TableCell>{request.userId._id}</TableCell>
                    <TableCell>{request.userId.name}</TableCell>
                    <TableCell>{request.userId.email}</TableCell>
                    <TableCell>{request.currentRole}</TableCell>
                    <TableCell>{request.requestedRole}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.documents ? "Yes" : "No"}</TableCell>
                    <TableCell>{request.address}</TableCell>
                    <TableCell>{request.userFeedback}</TableCell>
                    <TableCell>
                      <Textarea
                        autoFocus
                        placeholder="Add your approval or rejection comments"
                        name="comments"
                        value={comments[request._id] || ""}
                        onChange={(e) =>
                          setComments((prev) => ({
                            ...prev,
                            [request._id]: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Button
                          disabled={isApprovalLoading || isRejectionLoading}
                          type="submit"
                          onClick={() =>
                            handleSubmission(
                              {
                                requestId: request._id,
                                comments: comments[request._id] ?? "",
                              },
                              "success"
                            )
                          }
                          className="bg-orange-500 text-[9px] md:text-sm dark:bg-gray-200"
                        >
                          Approve
                        </Button>
                        <Button
                          disabled={isRejectionLoading || isApprovalLoading}
                          onClick={() =>
                            handleSubmission(
                              {
                                requestId: request._id,
                                comments: comments[request._id] ?? "",
                              },
                              "reject"
                            )
                          }
                          type="submit"
                          className="bg-red-500 text-[9px] md:text-sm dark:bg-gray-400"
                        >
                          Decline
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Roles
