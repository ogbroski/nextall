'use client';

import { IApplication } from '@/interfaces';
import { useEffect, useState } from 'react';
import useUsersStore, { IUsersStore } from '@/store/users-store';
import { getAppsByJobSeekerID } from '@/actions/applications';
import toast from 'react-hot-toast';
import PageTitle from '@/components/functional/page-title';
import Spinner from '@/components/ui/spinner';
import InfoMessage from '@/components/functional/info-message';
import { Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { appStatusMap, getAppStatusClass, jobTypeMap } from '@/constants';
import 'dayjs/locale/ru'
import CoverLetterModal from '@/components/functional/cover-letter-modal';

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useUsersStore() as IUsersStore;
    dayjs.locale("ru");

    const [selectedApp, setSelectedApp] = useState<IApplication | null>(null);
    const [openCoverLetterModal, setOpenCoverLetterModal] = useState(false);
    const fetchApplications = async () => {
        setLoading(true);
        const response: any = await getAppsByJobSeekerID(user!.id);
        
        if (response.success) {
            setApplications(response.data);
        } else {
            toast.error(response.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            fetchApplications();
        }
    }, []);
    const columns = [
        'Название вакансии',
        'Локация',
        'Тип занятости',
        'Дата отклика',
        'Статус',
        'Действия'
    ];
    return (
   <div>
       <PageTitle title="Мои отклики на вакансии" />
       {loading && <Spinner parentHeight="200px" />}
       {!loading && applications.length === 0 && <InfoMessage message="У Вас ещё нет откликов на вакансии"/>}
       {!loading && applications.length > 0 && <div>
           <Table className="border border-gray-300 mt-5">
               <TableHeader>
                   <TableRow className="bg-gray-200">
                       {columns.map((column) => (
                           <TableHead className="font-bold!" key={column}>{column}</TableHead>
                       ))}
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {applications.map((app) => (
                       <TableRow key={app.id}>
                           <TableCell>{app.job!.title}</TableCell>
                           <TableCell>{app.job!.location}</TableCell>
                           <TableCell>{jobTypeMap[app.job!.job_type]}</TableCell>
                           <TableCell>{dayjs(app.created_at).format("MMM DD , YYYY hh:mm A")}</TableCell>
                           <TableCell>
                               <div className={getAppStatusClass(app.status)}>
                                   {appStatusMap[app.status]}
                               </div>
                           </TableCell>
                           <TableCell>
                               <div className="flex gap-5">
                                   <Button 
                                        variant={"outline"}
                                        className="flex items-center justify-center"
                                        onClick = {()=> {setSelectedApp(app); setOpenCoverLetterModal(true)}}
                                    >
                                       <Eye size={14}/> Посмотреть сопроводительное письмо
                                   </Button>
                               </div>
                           </TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
       </div>}
       {selectedApp && (
    <CoverLetterModal
      open={openCoverLetterModal}
      setOpen={setOpenCoverLetterModal}
      title={`Сопроводительное письмо для вакансии "${selectedApp.job!.title}"`}
      content={selectedApp.cover_letter || 'Нет сопроводительного письма'}
    />
  )}
       

   </div>
)

}