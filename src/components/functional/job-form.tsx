'use client';

import { editJobById } from "@/actions/jobs";
import { IUsersStore } from "@/store/users-store";
import useUsersStore from "@/store/users-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { jobTypes, jobStatuses } from "@/constants";
import { useState } from "react";
import { X } from "lucide-react";
import { createJob } from "@/actions/jobs";
import Editor from 'react-simple-wysiwyg';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(2, { message: "Название вакансии должно содержать как минимум 2 символа" }),
    description: z.string().min(10, { message: "Описание вакансии должно содержать как минимум 10 символов" }),
    location: z.string().min(2, { message: "Локация должна содержать как минимум 2 символа" }),
    job_type: z.string().min(1, { message: "Требуется указать тип занятости" }),
    min_salary: z.number().min(0, { message: "Минимальная зарплата должна быть положительным числом" }),
    max_salary: z.number().min(0, { message: "Максимальная зарплата должна быть положительным числом" }),
    exp_required: z.number().min(1, { message: "Требуется указать требуемый опыт работы" }),
    last_date_to_apply: z.string().min(1, { message: "Требуется заполнить поле" }),
    status: z.string().min(1, { message: "Требуется заполнить поле" }),
});

export default function JobForm({ formType = "add", initialValues }: { formType: 'add' | 'edit', initialValues?: any }) {
    const [skillsAdded, setSkillsAdded] = useState<string[]>(initialValues?.skills || []);
    const [skillsInputValue, setSkillsInputValue] = useState<string>("");
    const { user } = useUsersStore() as IUsersStore;
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const addSkillHandler = () => {
        const skills = skillsInputValue.split(",").map((skill) => skill.trim());
        setSkillsAdded((previousSkills) => [...previousSkills, ...skills]);
        setSkillsInputValue("");
    };

    const deleteSkillHandler = (skillToRemove: string) => {
        setSkillsAdded((previousSkills) => previousSkills.filter((skill) => skill !== skillToRemove));
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialValues?.title || "",
            description: initialValues?.description || "",
            location: initialValues?.location || "",
            job_type: initialValues?.job_type || "",
            min_salary: initialValues?.min_salary || 0,
            max_salary: initialValues?.max_salary || 0,
            exp_required: initialValues?.exp_required || 0,
            last_date_to_apply: initialValues?.last_date_to_apply || "",
            status: initialValues?.status || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const payload = { ...values, skills: skillsAdded };
            let response: any = null;

            if (formType === "add") {
                response = await createJob({
                    ...payload,
                    recruiter_id: user?.id!
                });
            } else {
                response = await editJobById(initialValues?.id, {
                    ...payload,
                    recruiter_id: user?.id!
                });
            }

            if (response?.success) {
                toast.success(response.message);
                router.push("/recruiter/jobs");
            } else {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error('Что-то пошло не так');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название вакансии</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание вакансии</FormLabel>
                                <FormControl>
                                    <Editor value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <h1 className="text-sm">Навыки</h1>
                        <div className="flex gap-5">
                            <Input
                                placeholder="Введите навыки через запятую"
                                value={skillsInputValue}
                                onChange={(e) => setSkillsInputValue(e.target.value)}
                            />
                            <Button onClick={addSkillHandler} type="button">Добавить навыки</Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {skillsAdded.map((skill, index) => (
                                <div key={index} className="bg-primary px-3 py-1 rounded-full flex items-center gap-2">
                                    <span className="text-white text-sm">{skill}</span>
                                    <X 
                                        size={14} 
                                        className="text-white cursor-pointer hover:text-gray-200" 
                                        onClick={() => deleteSkillHandler(skill)} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Локация</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="job_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Тип занятости</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Выберите тип занятости" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobTypes.map((jobType) => (
                                                    <SelectItem key={jobType.value} value={jobType.value}>
                                                        {jobType.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="min_salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Минимальная зарплата</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={Number(field.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max_salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Максимальная зарплата</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={Number(field.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="exp_required"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Требуемый опыт</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={Number(field.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_date_to_apply"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Дедлайн дата</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="date" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Статус</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Выберите статус" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobStatuses.map((jobStatus) => (
                                                    <SelectItem key={jobStatus.value} value={jobStatus.value}>
                                                        {jobStatus.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="mt-2" disabled={loading}>
                            {loading ? "Сохранение..." : formType === "add" ? "Создать" : "Сохранить"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}