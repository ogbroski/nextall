import {Button} from "@/components/ui/button"
import heroImg from "@/public/hero.png"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div>
    <div className="flex justify-between px-20 py-5 bg-primary">
    <h1 className="font-bold text-2xl text-white">Next Jobs</h1>
    <Button variant={"outline"}>
    <Link href="/login">Войти</Link>
    </Button>
    </div>
    <div className="grid md:grid-cols-2 min-h-[80vh] items-center px-20 mt-5">
    <div className="col-span-1 flex flex-col items-center">
    <div className="flex flex-col gap-2">
    <h1 className="text-primary text-4xl font-bold">Найди работу своей мечты</h1>
    <p className="text-sm font-semibold! text-gray-600">
    Добро пожаловать в Next Jobs - Ваша платформа для поиска работы.
    Просматривайте вакансии, откликайтесь с легкостью или ищите нужных квалифицированных сотрудников.
    Наша платформа - все, что Вам нужно!
    </p>
    <Button className="w-max">
    <Link href="/register">Найти работу</Link>
    </Button>
    </div>
    </div>
    <div className="col-span-1 flex justify-center">
    <Image className="object-contain h-96" src={heroImg} alt="Next Jobs logo" />
    </div>
    </div>
    </div>
    );
}