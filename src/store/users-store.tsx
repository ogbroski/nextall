import { create } from 'zustand'
import { IUser } from "@/interfaces"

export interface IUsersStore {
    user: IUser | null;
    setUser: (payload: IUser) => void;
}

const useUsersStore = create<IUsersStore>((set) => ({
    user: null,
    setUser: (payload: IUser) => { set({user: payload}) }
}));

export default useUsersStore