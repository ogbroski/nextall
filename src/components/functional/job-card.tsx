'use client';

import { IJob } from "@/interfaces";
import { jobTypeMap } from "@/constants";
import { Banknote, Calendar, ListCheck, MapPin } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function JobCard({job}: {job: IJob}) {
    const router = useRouter();
    return (
        <div 
            className="flex flex-col gap-4 p-4 border border-gray-400 rounded cursor-pointer hover:border-primary"
            onClick={() => router.push(`/job-seeker/jobs/${job.id}`)}
        >
            <div className="flex justify-between">
                <div>
                    <h1 className="text-sm font-bold text-gray-700">{job.title}</h1>
                    <h1 className="text-xs text-gray-500">{job.recruiter.name}</h1>
                    </div>
                <div className="h-max bg-blue-100 text-blue-600 border border-blue-600 px-2 py-1 rounded capitalize text-xs font-medium">
                {jobTypeMap[job.job_type]}
                </div>
                </div>
                Карточка вакансии
            <p className="text-sm line-clamp-2 text-gray-500" dangerouslySetInnerHTML={{__html: job.description}}></p>
            <div className="flex items-center">
                <MapPin size={14} className="text-gray-600" />
                <span className="text-xs text-gray-600 ml-1">{job.location}</span>
            </div>
            <div className="flex items-center">
                <Banknote size={14} className="text-gray-600" />
                <span className="text-xs text-gray-600 ml-1">{job.min_salary}-{job.max_salary}</span>
            </div>
            <div className="flex items-center">
                <Calendar size={14} className="text-gray-600" />
                <span className="text-xs text-gray-600 ml-1">Можно откликнуться до - {dayjs(job.last_date_to_apply).format('DD.MM.YYYY')}</span>
            </div>
            <div className="flex items-center">
                <ListCheck size={14} className="text-gray-600"/>
                <span className="text-xs text-gray-600 ml-1">Требуемый опыт работы (лет): {job.exp_required}</span>
            </div>
            <div className="flex flex-wrap">
                {job.skills.map((skill, index) => (
                    <div key={index} className={`bg-gray-200 border border-gray-400 text-gray-700 px-2 py-1 rounded text-xs font-medium mr-2 mb-2`}>
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
}