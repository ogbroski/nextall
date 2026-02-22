'use server';
import supabase from '@/config/supabase-config';
import { IApplication } from '@/interfaces';
import { sendEmail } from '@/utils/send-mail';

export const createApplication = async (payload: Partial<IApplication>) => {
  try {
    const app = await supabase.from('applications').insert([payload]);
    
    if (app.error) {
      throw new Error(app.error.message);
    }
    
    return {
      success: true,
      message: 'Отклик на вакансию успешно отправлен',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAppsByJobSeekerID = async (jobSeekerId: number) => {
    try {
        const appsResponse = await supabase
            .from('applications')
            .select('*, job:jobs(*)')
            .eq('job_seeker_id', jobSeekerId)
            .order('created_at', { ascending: false });

        if (appsResponse.error) {
            throw new Error(appsResponse.error.message);
        }
        return {
            success: true,
            data: appsResponse.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const getAppsByJobId = async (jobId: number) => {
    try {
        const appsResponse = await supabase
            .from("applications")
            .select(`
                *,
                job:jobs(*),
                job_seeker:user_profiles!applications_job_seeker_id_fkey(name, id, email)
            `)
            .eq("job_id", jobId)
            .order("created_at", { ascending: false });

        if (appsResponse.error) {
            throw new Error(appsResponse.error.message);
        }

        return {
            success: true,
            data: appsResponse.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const getAppsByRecruiterId = async (recruiterId: number) => {
    try {
        const applicationsResponse = await supabase
            .from("applications")
            .select(`
                *,
                job:jobs(*),
                job_seeker:user_profiles!applications_job_seeker_id_fkey(name, id, email)
            `)
            .eq("recruiter_id", recruiterId)
            .order("created_at", { ascending: false });

        if (applicationsResponse.error) {
            throw new Error(applicationsResponse.error.message);
        }

        return {
            success: true,
            data: applicationsResponse.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
export const updateAppStatus = async ({applicationId,newStatus,email,name,}: {applicationId: number;newStatus: string;email: string;name: string;}) => {
   try {
       const updateApplication = await supabase
           .from("applications")
           .update({ status: newStatus })
           .eq("id", applicationId);
       if (updateApplication.error) {
           throw new Error(updateApplication.error.message);
       }

       let emailBody: any = {
           email,
           subjectLine: "Статус отклика обновлен",
       };

       if (newStatus === "shortlisted") {
           emailBody.content = `
       <p>${name},</p>
       <p>Наши поздравления! Вы были выбраны для дальнейшего интервью. С Вами скоро свяжутся</p>`;
       } else if (newStatus === "rejected") {
           emailBody.content = `
       <p>${name},</p>
       <p>Мы ценим ваш интерес к данной должности. После тщательного рассмотрения мы с сожалением сообщаем вам, что не будем рассматривать вашу заявку дальше.</p>
       <p>Желаем вам всяческих успехов в поиске работы.</p>`;
       }

       await sendEmail(emailBody);

       return {
           success: true,
           message: "Статус отклика успешно обновлен",
       };
   } catch (error: any) {
       return {
           success: false,
           message: error.message,
       };
   }
};