'use client'

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface pageProps { }

export default function Page({ }: pageProps) {
    const { data, status } = useSession()

    const router = useRouter()

    if (status === 'loading') {
        return <Loader2 className="mx-auto animate-spin" />
    }

    if (status === 'authenticated') {
        router.push('/')
    }

    return (
        <div className="flex items-center justify-center h-[80vh] md:h-[calc(100vh-9rem)] p-4">
            <div className="flex flex-col md:flex-row h-full md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2 shadow-2xl rounded-md">
                <div className="flex-1 relative">
                    <Image
                        src='/loginBg.png'
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-[2] md:flex-1 flex flex-col gap-8 px-4 py-10 sm:p-10">
                    <h1 className="font-bold text-xl lg:text-3xl 2xl:text-4xl">Bem Vindo</h1>
                    <p>Entre em sua conta ou crie uma nova usando a conta Google</p>

                    <Button variant='secondary' onClick={() => signIn('google')}>
                        <svg
                            className='mr-2 h-4 w-4'
                            aria-hidden='true'
                            focusable='false'
                            data-prefix='fab'
                            data-icon='github'
                            role='img'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'>
                            <path
                                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                fill='#4285F4'
                            />
                            <path
                                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                fill='#34A853'
                            />
                            <path
                                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                                fill='#FBBC05'
                            />
                            <path
                                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                                fill='#EA4335'
                            />
                            <path d='M1 1h22v22H1z' fill='none' />
                        </svg>

                        <span>Entrar com o Google</span>
                    </Button>

                    <p className="text-sm">Teve um problema? <Link href='/' className="underline font-medium">Contate-nos</Link></p>
                </div>
            </div>
        </div>
    )
}
