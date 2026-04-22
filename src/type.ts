/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  _id: string
  email: string
  name: string
  addressLine1: string
  city: string
  profile_pic: string
  country: string
  role: string
}

export type RoleRequestType = {
  id: string
  status: string
  requestedRole: string
  currentRole: string
  fullAddress: string
  documents: boolean
  feedback: string
  createdAt: Date
}

declare global {
  interface Window {
    cloudinary: any
  }
}
