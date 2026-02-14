import React, {useEffect, useState} from 'react'
import PrivateHeader from "@/custom-layout/private-header"
import {getLoggedInUser} from "@/actions/users"
import toast from "react-hot-toast"
import useUsersStore, {IUsersStore} from "@/store/users-store";
import Cookies from "js-cookie"
import {useRouter} from "next/navigation"
import Spinner from '@/components/ui/spinner';

export default function PrivateLayout({children}: {children: React.ReactNode}) {
  const setUser = useUsersStore((state: IUsersStore) => state.setUser)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    setLoading(true)
    const response = await getLoggedInUser()
    if (!response.success) {
      toast.error(response.message)
      Cookies.remove("token")
      router.push("/login")
      return
    }
    setUser(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) {
    return (
        <Spinner/>
    )
}

  return (
    <div>
      <PrivateHeader />
      <div className="p-5">{children}</div>
    </div>
  )
}