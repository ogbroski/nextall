import { getLoggedInUser } from "@/actions/users";
import InfoMessage from "@/components/functional/info-message";
import { getAppsByRecruiterId } from "@/actions/applications";
import PageTitle from "@/components/functional/page-title";
import RecruiterAppsTable from "@/components/functional/recruiter-apps-table";

export default async function RecruiterApplicationsPage() {
    const userResponse = await getLoggedInUser();
    
    if (!userResponse.success) {
        return <InfoMessage message="Не удалось загрузить информацию о пользователе" />
    }
    
    const recruiter = userResponse.data;
    const appsResponse: any = await getAppsByRecruiterId(recruiter.id);
    
    if (!appsResponse.success) {
        return <InfoMessage message="Не удалось загрузить информацию об откликах" />
    }

    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Все отклики" />
            <RecruiterAppsTable data={appsResponse.data} />
        </div>
    );
}