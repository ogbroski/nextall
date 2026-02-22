import PageTitle from "@/components/functional/page-title";
import { getAllActiveJobs } from "@/actions/jobs";
import { IJob } from "@/interfaces";
import InfoMessage from "@/components/functional/info-message";
import JobCard from "@/components/functional/job-card";
import Filters from "@/components/functional/filters";

interface JobListPageProps {
    searchParams: Promise<{searchParams: Record<string,string>}>
}

export default async function JobListPage({searchParams}: JobListPageProps) {
    const { location, jobType, keywords, minSalary, maxSalary, experienceLevel }: any = await searchParams;
    const jobsResponse: any = await getAllActiveJobs({location, jobType, keywords, minSalary, maxSalary, experienceLevel});
    let jobs: IJob[] = [];
    if (jobsResponse.success) {
        jobs = jobs = jobsResponse.data;
    }
    return (
        <div className="flex flex-col gap-5">
            <div>
                <PageTitle title="Поиск вакансий"/>
                <span className="text-xs text-gray-600">
                    Найти работу мечты
                </span>
            </div>
            {jobs.length === 0 && <InfoMessage message="На данный момент вакансии отсутсвуют" />}
            <Filters />
            {jobs.length > 0 && (
                <div className="flex flex-col gap-5">
                    {jobs.map((job)=> <JobCard job={job} key={job.id}/>)}
                </div>
            )}
        </div>
    )
}