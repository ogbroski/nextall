export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role?: string | undefined;
    profile_pic: string;
    resume_url: string;
    bio: string;
    created_at: string;
    updated_at: string;
}

export interface IJob {
    id: number;
    recruiter_id: number;
    title: string;
    description: string;
    location: string;
    job_type: string;
    min_salary: number;
    max_salary: number;
    exp_required: number;
    last_date_to_apply: string;
    status: string;
    created_at: string;
    updated_at: string;
}