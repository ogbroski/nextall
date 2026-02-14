'use client'

import React from "react"
import {usePathname} from "next/navigation"
import PrivateLayout from "@/custom-layout/private"

export default function CustomLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isPrivate = pathname.startsWith("/job-seeker") || pathname.startsWith("/recruiter")
    
    if (!isPrivate) {
        return children
    }
    
    return (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    )
}