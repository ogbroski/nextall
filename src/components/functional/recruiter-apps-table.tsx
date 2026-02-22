'use client';

import {IApplication} from "@/interfaces";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import InfoMessage from "@/components/functional/info-message";
import {appStatuses, jobTypeMap} from "@/constants";
import dayjs from "dayjs";
import 'dayjs/locale/ru'
import {Button} from "@/components/ui/button";
import {Eye, List} from "lucide-react";
import {useState} from "react";
import CoverLetterModal from "@/components/functional/cover-letter-modal";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import toast from "react-hot-toast";
import {updateAppStatus} from "@/actions/applications";


export default function RecruiterAppsTable({data}: {data: IApplication[]}) {
   dayjs.locale("ru");

   const [selectedApp, setSelectedApp] = useState<IApplication | null>(null);
   const [openCoverLetterModal, setOpenCoverLetterModal] = useState(false);
   const [localData, setLocalData] = useState<IApplication[]>(data);
   const onStatusChange = async (
       application: IApplication,
       newStatus: string
   ) => {
       const response = await updateAppStatus({
           applicationId: application.id,
           newStatus,
           email: application.job_seeker!.email,
           name: application.job_seeker!.name,
       });
       if (response.success) {
           toast.success("Отклик успешно обновлен");
           const updatedData = localData.map((app) => {
               if (app.id === application.id) {
                   return { ...app, status: newStatus };
               }
               return app;
           });
           setLocalData(updatedData);
       } else {
           toast.error(response.message);
       }
   };
   const columns = [
       'Идентификатор соискателя',
       'Имя соискателя',
       'Почта соискателя',
       'Локация',
       'Тип занятости',
       'Дата отклика',
       'Статус',
       'Действия'
   ]

   return (
       <div className="flex flex-col gap-5">
           {localData.length === 0 && <InfoMessage message="У Вас ещё нет откликов на вакансии"/>}
           {localData.length > 0 && <div>
               <Table className="border border-gray-300 mt-5">
                   <TableHeader>
                       <TableRow className="bg-gray-200">
                           {columns.map((column) => (
                               <TableHead className="font-bold!" key={column}>{column}</TableHead>
                           ))}
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       {localData.map((app) => (
                           <TableRow key={app.id}>
                               <TableCell>{app.job_seeker!.id}</TableCell>
                               <TableCell>{app.job_seeker!.name}</TableCell>
                               <TableCell>{app.job_seeker!.email}</TableCell>
                               <TableCell>{app.job!.location}</TableCell>
                               <TableCell>{jobTypeMap[app.job!.job_type]}</TableCell>
                               <TableCell>{dayjs(app.created_at).format("MMM DD , YYYY hh:mm A")}</TableCell>
                               <TableCell>
                                   <Select value={app.status} onValueChange={(value) => {onStatusChange(app, value)}}>
                                       <SelectTrigger className="w-full">
                                           <SelectValue placeholder="Выберите статус" />
                                       </SelectTrigger>
                                       <SelectContent>
                                           {appStatuses.map((appStatus) => (
                                               <SelectItem key={appStatus.value} value={appStatus.value}>{appStatus.label}</SelectItem>
                                           ))}
                                       </SelectContent>
                                   </Select>
                               </TableCell>
                               <TableCell>
                                   <div className="flex gap-5">
                                       <Button
                                           variant={"outline"}
                                           className="flex items-center justify-center"
                                           onClick={() =>{ setSelectedApp(app); setOpenCoverLetterModal(true)}}
                                       >
                                           <Eye size={14}/> Посмотреть сопроводительное письмо
                                       </Button>
                                       <Button
                                           variant={"outline"}
                                           className="flex items-center justify-center"
                                           onClick={() =>{ window.open(app.resume_url, "_blank") }}
                                       >
                                           <List size={14}/> Посмотреть резюме
                                       </Button>
                                   </div>
                               </TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </div>}
           {selectedApp && <CoverLetterModal
               open={openCoverLetterModal}
               setOpen={setOpenCoverLetterModal}
               title={`Сопроводительное письмо для вакансии "${selectedApp.job!.title}"`}
               content={selectedApp.cover_letter || 'Нет сопроводительного письма'}
           />}
       </div>
   )
}