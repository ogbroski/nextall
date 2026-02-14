import PageTitle from "@/components/functional/page-title";
import JobForm from "@/components/functional/job-form";
import { getJobById } from "@/actions/jobs";
import InfoMessage from "@/components/functional/info-message";

interface EditJobPageProps {
    params: Promise<{ id: string }>
}

export default async function EditJobPage({ params }: EditJobPageProps) {
    const { id } = await params;
    const response = await getJobById(Number(id));
    console.log(response)
    if (!response.success || !response.data) {
        return <InfoMessage message="Вакансия не найдена" />
    }

    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Редактирование вакансии" />
            <JobForm formType="edit" initialValues={response.data} />
        </div>
    )
}