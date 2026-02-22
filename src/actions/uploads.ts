'use server';
import supabase from "@/config/supabase-config";

export const uploadFile = async (file: File) => {
    try {
        const uniqueName = `${Date.now()}-${file.name}`;
        const path = `resumes/${uniqueName}`;
        
        const uploadedFile = await supabase.storage.from('default').upload(path, file);
        
        if (uploadedFile.error) {
            throw new Error(uploadedFile.error.message);
        }
        
        const url = supabase.storage.from('default').getPublicUrl(path).data.publicUrl;
        
        return {
            success: true,
            data: url,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};