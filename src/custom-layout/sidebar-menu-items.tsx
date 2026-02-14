
import LogoutButton from "@/components/functional/logout-btn"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { LayoutDashboard, Briefcase, FileText, UserSquare } from 'lucide-react'
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

interface SidebarMenuItemsProps {
    openMenuItems: boolean
    setOpenMenuItems: (open: boolean) => void
    role: string
}

export default function SidebarMenuItems({openMenuItems, setOpenMenuItems, role}: SidebarMenuItemsProps) {
  const iconSize = 15
  const pathname = usePathname()
  const router = useRouter()
  const jobSeekerMenuItems: any = [
    {
      title: "Панель управления",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/job-seeker/dashboard",
    },
    {
      title: "Вакансии",
      icon: <Briefcase size={iconSize} />,
      path: "/job-seeker/jobs",
    },
    {
      title: "Мои отклики",
      icon: <FileText size={iconSize} />,
      path: "/job-seeker/applications",
    },
    {
      title: "Профиль",
      icon: <UserSquare size={iconSize} />,
      path: "/job-seeker/profile",
    },
  ];
  const recruiterMenuItems: any = [
  {
    title: "Панель управления",
    icon: <LayoutDashboard size={iconSize} />,
    path: "/recruiter/dashboard",
  },
  {
    title: "Наши вакансии",
    icon: <Briefcase size={iconSize} />,
    path: "/recruiter/jobs",
  },
  {
    title: "Отклики на вакансии",
    icon: <FileText size={iconSize} />,
    path: "/recruiter/applications",
  },
  {
    title: "Профиль",
    icon: <UserSquare size={iconSize} />,
    path: "/recruiter/profile",
  },
];
const menuItemsToRender = role === "recruiter" ? recruiterMenuItems : jobSeekerMenuItems

    return (
  <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Меню навигации</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 px-10 py-10">
  {menuItemsToRender.map((item: any) => {
    const activeClass = pathname === item.path ? "bg-gray-100 rounded-lg border border-primary" : "";
    return (
      <div 
        key={item.title}
        onClick={() => { 
          router.push(item.path); 
          setOpenMenuItems(false);
        }}
        className={`cursor-pointer p-3 flex gap-3 items-center ${activeClass}`}
      >
        {item.icon}
        <span className="text-sm">{item.title}</span>
      </div>
    )
  })}
  <LogoutButton/>
</div>
    </SheetContent>
  </Sheet>
)
}