"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

function Header() {
    const path = usePathname();

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-small'>
            <Image src={'/logo.svg'} width={60} height={40} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/dashboard' && 'text-primary font-bold'}
                    `}>
                    <Link href='/dashboard'>Dashboard</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/question' && 'text-primary font-bold'}
                    `}>
                    <Link href='/question'>Questions</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/work' && 'text-primary font-bold'}
                    `}>
                    <Link href='/work'>How it Works</Link>
                </li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header
