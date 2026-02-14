'use client'


import LogoutButton from "@/components/functional/logout-btn"
import useUsersStore, { IUsersStore } from "@/store/users-store"

export default function RecruiterDashboard() {
    const { user } = useUsersStore() as IUsersStore

    return (
        <div className="flex flex-col gap-5">
            <h1>Страница кадровика</h1>
            {user &&
                <div className="flex flex-col gap-5 border border-gray-200 w-max p-5">
                    <h1>ID: {user.id}</h1>
                    <h1>Имя пользователя: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>Роль: {user.role}</h1>
                    <LogoutButton />
                </div>
            }
        </div>
    )
}