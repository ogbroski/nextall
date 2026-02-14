import {getLoggedInUser} from "@/actions/users"
import {IUser} from "@/interfaces"
import LogoutButton from "@/components/functional/logout-btn"

export default async function JobSeekerDashboard() {
    const response = await getLoggedInUser()
    if (!response.success) {
    return <div>{response.message}</div>
    }

    const user : IUser = response.data
    return (
    <div className="flex flex-col gap-5 p-5">
    <h1>Страница соискателя</h1>
    <div className="flex flex-col gap-5 border border-gray-200 w-max">
    <h1>ID: {user.id}</h1>
    <h1>Имя пользователя: {user.name}</h1>
    <h1>Email: {user.email}</h1>
    <h1>Роль: {user.role}</h1>
    <LogoutButton />
    </div>
    </div>
    );
}