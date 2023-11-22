'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserLinks() {
    const { status } = useSession()

    return (
        <div>
            {status !== 'authenticated' ? (
                <Link href='/login' className="hover:text-red-500">Entrar</Link>
            ) : (
                <div className="flex gap-4">
                    <Link href='/orders' className="hover:text-red-500">Pedidos</Link>
                    <span
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => signOut()}
                    >
                        Sair
                    </span>
                </div>
            )}

        </div>
    )
}
