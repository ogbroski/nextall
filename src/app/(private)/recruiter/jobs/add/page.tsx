import PageTitle from "@/components/functional/page-title";
import JobForm from "@/components/functional/job-form";

export default function AddJobPage() {
    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Создание вакансии" />
            <JobForm formType="add"/>
        </div>
    )
}