'use client';

import PageTitle from "@/components/functional/page-title";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";
import {IJob} from "@/interfaces";
import {useEffect, useState} from "react";
import {getRecruiterJobs} from "@/actions/jobs";
import useUsersStore, {IUsersStore} from "@/store/users-store";
import Spinner from "@/components/ui/spinner";
import InfoMessage from "@/components/functional/info-message"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Trash } from "lucide-react"
import { EyeIcon } from "lucide-react"
import { Edit } from "lucide-react"
import { useRouter } from "next/navigation";
import dayjs from 'dayjs'
import { jobStatusesClasses } from "@/constants";
import toast from "react-hot-toast";
import { deleteJobById } from "@/actions/jobs";
import 'dayjs/locale/ru';
import { statusTypeMap, jobTypeMap } from "@/constants";



export default function RecruiterJobsPage() {
    dayjs.locale('ru');
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUsersStore() as IUsersStore;

  const fetchJobs = async () => {
    setLoading(true);
    const response: any = await getRecruiterJobs(user?.id!);
    if (response.success) {
      setJobs(response.data);
    }
    setLoading(false);
  };
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      fetchJobs();
    }
  }, [user]);

const columns = [
    'Название вакансии',
    'Локация',
    'Тип занятости',
    'Дата создания',
    'Статус',
    'Действия'
]

const deleteJobHandler = async (jobId: number): Promise<void> => {
    const response: any = await deleteJobById(jobId);
    if (response.success) {
        toast.success(response.message);
        fetchJobs();
    } else {
        toast.error(response.message);
    }
}
  return (
   <div className="flex flex-col gap-5">
       <div className="flex justify-between items-center">
           <PageTitle title="Наши вакансии" />
           <Button className="flex items-center gap-1">
               <Plus size={14} />
               <Link href="/recruiter/jobs/add" >Создать вакансию</Link>
           </Button>
       </div>
       {loading && <Spinner parentHeight="200px" />}
       {!loading && jobs.length === 0 && <InfoMessage message="Нет добавленных вакансий"/>}
       {!loading && jobs.length > 0 && <div>
           <Table className="border border-gray-300">
               <TableHeader>
                   <TableRow className="bg-gray-200">
                       {columns.map((column) => (
                           <TableHead className="font-bold!" key={column}>{column}</TableHead>
                       ))}
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {jobs.map((job) => (
                       <TableRow key={job.id}>
                           <TableCell>{job.title}</TableCell>
                           <TableCell>{job.location}</TableCell>
                           <TableCell>{job.job_type}</TableCell>
                           <TableCell>{dayjs(job.created_at).format("MMM DD , YYYY hh:mm A")}</TableCell>
                           <TableCell><div className={jobStatusesClasses[job.status]}>
    {job.status}
</div></TableCell>
                           <TableCell>
                               <div className="flex gap-5">
                                   <Button variant={"outline"} size="sm">
                                       <EyeIcon size={14}/>
                                   </Button>
                                     <Button variant="outline" size="sm" onClick={() => router.push(`/recruiter/jobs/edit/${job.id}`)}>
                                       <Edit size={14}/>
                                   </Button>
                                   <Button variant={"outline"} size="sm" onClick={() => deleteJobHandler(job.id)}>
                                       <Trash size={14}/>
                                   </Button>
                               </div>
                           </TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
       </div>}
   </div>
)


}