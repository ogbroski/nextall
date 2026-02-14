import useUsersStore, {IUsersStore} from "@/store/users-store"
import {Menu} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import SidebarMenuItems from "@/custom-layout/sidebar-menu-items"

export default function PrivateHeader() {
  const {user} = useUsersStore() as IUsersStore
  const [openMenuItems, setOpenMenuItems] = useState(false)

  return (
    <div className="bg-primary p-5 flex justify-between items-center">
      <h1 className="font-bold! text-xl text-white">Next Jobs</h1>
      <div className="flex gap-5 items-center">
        <h1 className="text-sm text-white">
          {user?.name} ({user?.role})
        </h1>
        <Button className="cursor-pointer" onClick={() => setOpenMenuItems(true)}>
          <Menu color="white" size={15} />
        </Button>
      </div>
      <SidebarMenuItems 
        openMenuItems={openMenuItems} 
        setOpenMenuItems={setOpenMenuItems} 
        role={user?.role || ""} 
      />
    </div>
  )
}