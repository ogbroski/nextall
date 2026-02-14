'use client';

import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast"

export default function LogoutButton() {
  const router = useRouter();
  const onLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    toast.success("Успешный выход из аккаунта")
    router.push("/login");
  };

  return (
    <div>
      <Button className="flex items-center gap-1 w-full" onClick={onLogout}>
      <LogOut size={15} />
      Выйти
      </Button>
    </div>
  )
}