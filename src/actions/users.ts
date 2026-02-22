'use server';

import supabase from "@/config/supabase-config";
import {IUser} from "@/interfaces"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export const registerUser = async (payload: Partial<IUser>) => {
    try {
        
        const {data, error} = await supabase.from('user_profiles').select('*').eq('email', payload.email);
        if (error) throw new Error(error.message);
        if (data && data.length > 0) {
            throw new Error('Пользователь с таким email уже существует');
        }
        
        
        payload.password = await bcrypt.hash(payload.password || "", 10);

        
        const user = await supabase.from('user_profiles').insert([payload]);
        if (user.error) throw new Error(user.error.message);
        return {
            success: true,
            message: 'Пользователь успешно зарегистрирован'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const loginUser = async (payload: Partial<IUser>) => {
  try {
    
    const user = await supabase.from('user_profiles').select('*').eq('email', payload.email);
    if (user.error || user.data?.length === 0) throw new Error('Пользователь не найден');

    
    const userData = user.data[0];
    if (userData.role !== payload.role) throw new Error('Выбрана некорректная роль');
    const isPasswordValid = await bcrypt.compare(payload.password || '', userData.password || '');
    if (!isPasswordValid) throw new Error('Некорректный пароль');

    
    const dataToBeSigned = {
      id: userData.id,
      email: userData.email,
    }

    const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET || 'default', { expiresIn: '3d' });
    return {
      success: true,
      message: 'Успешный вход',
      data: token
    }
    
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}


export const getLoggedInUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) throw new Error('Token не найден');

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || !decoded.email) throw new Error('Некорректный токен');

    const userInfo = await supabase.from('user_profiles').select('*').eq('email', decoded.email);
    if (userInfo.error || userInfo.data?.length === 0) throw new Error('Пользователь не найден');

    const user = userInfo.data[0];
    delete user.password;
    return {
      success: true,
      data: user
    }
  } catch(error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}