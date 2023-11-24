'use client'

import { Loader2, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteProductButtonProps {
    id: string
}

export function DeleteProductButton({ id }: DeleteProductButtonProps) {
    const { data: session, status } = useSession()

    const router = useRouter()

    if (status === 'loading') return <p><Loader2 className="animate-spin" /></p>

    if (status === 'unauthenticated' || !session?.user.isAdmin) return

    async function handleDeleteProduct() {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
        })

        if (res.status === 200) {
            router.push('/menu')

            toast('O Produto foi deletado!')
        } else {
            const data = await res.json()

            toast.error(data.message)
        }
    }

    return (
        <Button
            variant={'destructive'}
            className="absolute top-4 right-4 p-2 rounded-full"
            aria-label="Deletar Produto"
            onClick={handleDeleteProduct}
        >
            <Trash2Icon />
        </Button>
    )
}
