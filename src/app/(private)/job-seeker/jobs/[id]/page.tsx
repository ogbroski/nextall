import { getJobById } from "@/actions/jobs";
import { jobTypeMap } from "@/constants";
import { IJob } from "@/interfaces";
import ApplyJobSection from "@/components/functional/apply-job-section";
import InfoMessage from "@/components/functional/info-message";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Banknote, Calendar, MapPin } from "lucide-react";

interface JobInfoPageProps {
  params: Promise<{ id: number }>
}

export default async function JobInfoPage({ params }: JobInfoPageProps) {
  const { id } = await params;
  const jobResponse = await getJobById(id)

  if (!jobResponse.success) {
    return <InfoMessage message="Не удалось получить данные о вакансии" />
  }

  const job: IJob = jobResponse.data

  return (
    <div className="flex flex-col gap-5">
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-700">{job.title}</h1>
                    <h1 className="text-sm text-gray-500">{job.recruiter.name}</h1>
                </div>
                <div className="h-max bg-blue-100 text-blue-600 border border-blue-600 px-2 py-1 rounded capitalize text-xs font-medium">
                    {jobTypeMap[job.job_type]}
                </div>
            </div>
            <div className="flex flex-wrap mt-3">
                {job.skills.map((skill, index) => (
                    <div
                    key={index}
                    className="bg-gray-200 border border-gray-400 text-gray-700 px-2 py-1 rounded text-xs font-medium mr-2 mb-2"
                    >
                    {skill}
                    </div>
                ))}
            </div>
        </div>
        <hr className="border border-gray-300" />
    
        <div className="flex justify-between">
            <div className="flex items-center">
                <MapPin size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600 ml-1">{job.location}</span>
            </div>
        
            <div className="flex items-center">
                <Banknote size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600 ml-1">
                {job.min_salary}-{job.max_salary}
                </span>
            </div>
        
            <div className="flex items-center">
                <Calendar size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600 ml-1">Можно откликнуться до - {dayjs(job.last_date_to_apply).format("DD.MM.YYYY")}
                </span>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 border border-gray-300 p-5 rounded-xl">
                <p className="text-sm wysiwyg-content" dangerouslySetInnerHTML={{ __html: job.description }}/>
            </div>
            <div className="col-span-1">
                <ApplyJobSection job={job}/>
            </div>
        </div>
    </div>
  )
}