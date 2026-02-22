import { getAppsByJobId } from "@/actions/applications";
import { getJobById } from "@/actions/jobs";
import InfoMessage from "@/components/functional/info-message";
import PageTitle from "@/components/functional/page-title";
import RecruiterAppsTable from "@/components/functional/recruiter-apps-table";

interface RecruiterJobApplicationsPageProps {
    params: Promise<{ id: string }>
}

export default async function RecruiterJobApplicationsPage({ params }: RecruiterJobApplicationsPageProps) {
    const { id } = await params;
    const response = await getJobById(Number(id));
    
    if (!response.success) {
        return <InfoMessage message={response.message || "Ошибка получения информации о вакансии"} />
    }
    const apps: any = await getAppsByJobId(Number(id));
if (!apps.success) {
    return <InfoMessage message={apps.message || "Ошибка получения откликов на вакансию"} />
}

    return (
    <div>
        <PageTitle title={`Отклики на вакансию ${response.data.title}`} />
        <RecruiterAppsTable data={apps.data} />
    </div>
)
}