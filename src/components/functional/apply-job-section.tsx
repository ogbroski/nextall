'use client';

import { IJob } from "@/interfaces";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import useUsersStore, { IUsersStore } from "@/store/users-store";
import { uploadFile } from "@/actions/uploads";
import toast from "react-hot-toast";
import { createApplication } from "@/actions/applications";

export default function ApplyJobSection({ job }: { job: IJob }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {user} = useUsersStore() as IUsersStore;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const resumeUrl = await uploadFile(selectedResumeFile!);

      if (!resumeUrl.success){
        throw new Error(resumeUrl.message)
      }
      const payload = {
        job_id: job.id,
        job_seeker_id: user?.id,
        recruiter_id: job.recruiter_id,
        cover_letter: coverLetter,
        resume_url: resumeUrl.data,
        status: 'pending',
      }
      const response = await createApplication(payload);
      if (!response.success){
        throw new Error(response.message)
      }

      toast.success('Отклик успешно отправлен');
      router.push('/job-seeker/applications');
    }catch (error) {
      toast.error('Не удалось отправить отклик. Попробуйте ещё раз')
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="border border-gray-300 p-5 rounded-xl flex flex-col gap-5">
      <h1 className="text-lg font-bold!">
        Отправить резюме
      </h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover-letter">Сопроводительное письмо</label>
        <Textarea
          id="cover-letter"
          placeholder="Напишите сопроводительное письмо"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover-letter">Выбрать резюме</label>
        <Input
          id="resume-selection"
          className="bg-gray-100 hidden"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedResumeFile(e.target.files[0]);
            }
          }} />
          <label 
            htmlFor="resume-selection"
            className="text-sm p-2 flex justify-center items-center gap-5 rounded border-2 border-dashed border-gray-400 text-gray-500 cursor-pointer"
          >
            <Upload size={12}/>Выбрать файл
          </label>
          {selectedResumeFile && (
            <div className="text-gray-700 mt-2">
              Выбран файл:{selectedResumeFile.name}
            </div>
          )}
      </div>

      <Button disabled={!coverLetter || !selectedResumeFile || loading} className="w-full" onClick={handleSubmit}>Отправить резюме</Button>
    </div>
  );
}