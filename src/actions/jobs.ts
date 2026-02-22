'use server';

import supabase from "@/config/supabase-config";
import { IJob } from "@/interfaces";


export const createJob = async (payload: Partial<IJob>) => {
    try {
        const newJob = await supabase.from("jobs").insert([payload]);
        if (newJob.error) {
            throw new Error(newJob.error.message);
        }

        return {
            success: true,
            message: "Вакансия упешно создана",
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const getJobById = async (jobId: number) => {
    try {
        const job = await supabase
            .from("jobs").
            select("*, recruiter:user_profiles(name, id)")
            .eq("id", jobId);
        if (job.error || job.data.length === 0 ) {
            throw new Error("Вакансия не найдена");
        }
        const jobData = job.data[0];

        return {
            success: true,
            data: jobData
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const editJobById = async (jobId: number,payload: Partial<IJob>) => {
    try {
        const updatedJob = await supabase.from("jobs").update(payload).eq("id",jobId);
        if (updatedJob.error) {
            throw new Error(updatedJob.error.message);
        }

        return {
            success: true,
            message: "Вакансия успешно обновлена",
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const deleteJobById = async (jobId: number) => {
    try {
        const deletedJob = await supabase.from("jobs").delete().eq("id",jobId);
        if (deletedJob.error) {
            throw new Error(deletedJob.error.message);
        }

        return {
            success: true,
            message: "Вакансия успешно удалена",
        
        }
        
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const getRecruiterJobs = async (recruiterId: number) => {
    try {
        const jobs = await supabase.from("jobs").select("*").eq("recruiter_id",recruiterId);
        if (jobs.error) {
            throw new Error(jobs.error.message);
        }

        return {
            success: true,
            data: jobs.data,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const getAllActiveJobs = async (filters: any) => { 
    try {
        
        const query = supabase
            .from('jobs')
            .select("*, recruiter:user_profiles(name, id)")
            .eq('status', 'open')
            .order('created_at', { ascending: false });

        if (filters.keywords) {
            query.contains('skills', filters.keywords.split(',').map((kw: string) => kw.trim()));
        }

        if (filters.location) {
            query.like('location', filters.location);
        }

        if (filters.jobType) {
            query.eq('job_type', filters.jobType);
        }

        if (filters.minSalary) {
            query.gte('min_salary', Number(filters.minSalary));
        }

        if (filters.maxSalary) {
            query.lte('max_salary', Number(filters.maxSalary));
        }

        if (filters.experienceLevel) {
            let from = filters.experienceLevel.split('-')[0];
            let to = filters.experienceLevel.split('-')[1];
            console.log(from, to);
            query.gte('exp_required', Number(from));
            query.lte('exp_required', Number(to));
        }

        const jobResponse = await query;

        if (jobResponse.error) {
            throw new Error(jobResponse.error.message);
        }

        return {
            success: true,
            data: jobResponse.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,}
        }
      }