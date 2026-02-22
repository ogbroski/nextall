'use client';

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { experienceLevels, jobTypes } from "@/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const initialData = {
    keywords: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    minSalary: 0,
    maxSalary: 0,
};

export default function Filters() {
    const [filters, setFilters] = useState(initialData);
    const router = useRouter();

    const onFilter = () => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                queryParams.append(key, value.toString());
            }
        });
        router.push(`/job-seeker/jobs?${queryParams.toString()}`);
    };

    const onClear = () => {
        setFilters(initialData);
        router.push("/job-seeker/jobs");
    };

    return (
        <div className="grid grid-cols-3 p-3 border border-gray-400 rounded gap-5">
            <div className="col-span-3">
                <h1 className="text-sm font-bold text-gray-600">Фильтры</h1>
            </div>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="keywords" className="text-sm text-gray-600">Ключевые слова</label>
                <Input
                    placeholder="Введите ключевые слова"
                    value={filters.keywords}
                    onChange={e => setFilters({...filters, keywords: e.target.value})}
                    id="keywords"
                />
            </div>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="location" className="text-sm text-gray-600">Локация</label>
                <Input
                    placeholder="Введите Вашу локацию"
                    value={filters.location}
                    onChange={e => setFilters({...filters, location: e.target.value})}
                    id="location"
                />
            </div>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="jobtype" className="text-sm text-gray-600">Тип занятости</label>
                <Select 
                    onValueChange={value => setFilters({...filters, jobType: value})} 
                    value={filters.jobType}
                >
                    <SelectTrigger id="jobtype" className="w-full">
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
            </div>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="minsalary" className="text-sm text-gray-600">Минимальная зарплата</label>
                <Input
                    type="number"
                    placeholder="Введите минимальную зарплату"
                    value={filters.minSalary || ""}
                    onChange={e => setFilters({...filters, minSalary: Number(e.target.value)})}
                    id="minsalary"
                />
            </div>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="maxsalary" className="text-sm text-gray-600">Максимальная зарплата</label>
                <Input
                    type="number"
                    placeholder="Введите максимальную зарплату"
                    value={filters.maxSalary || ""}
                    onChange={e => setFilters({...filters, maxSalary: Number(e.target.value)})}
                    id="maxsalary"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="experiencelevel" className="text-sm text-gray-600">Опыт</label>
                <Select 
                    onValueChange={value => setFilters({...filters, experienceLevel: value})} 
                    value={filters.experienceLevel}
                >
                    <SelectTrigger id="experiencelevel" className="w-full">
                        <SelectValue placeholder="Выберите ваш опыт" />
                    </SelectTrigger>
                    <SelectContent>
                        {experienceLevels.map((experienceLevel) => (
                            <SelectItem key={experienceLevel.value} value={experienceLevel.value}>
                                {experienceLevel.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="flex gap-5 items-end">
                <Button onClick={onFilter}>Поиск</Button>
                <Button variant={"outline"} onClick={onClear}>Сбросить фильтры</Button>
            </div>
        </div>
    );
}