'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Order } from "@/types/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon } from "lucide-react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import { toast } from "sonner"

export default function Page() {
    const { data: session, status } = useSession()

    const router = useRouter()

    if (status === 'unauthenticated') {
        router.push('/login')
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            fetch('http://localhost:3000/api/orders').then((res) => res.json()),
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => {
            return fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(status)
            })
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["orders"] })

            toast.success('Status atualizado com sucesso!')
        }
    })

    if (isPending || status === 'loading') return 'Loading...'

    function handleSubmit(e: FormEvent<HTMLFormElement>, id: string) {
        e.preventDefault()

        const form = e.target as HTMLFormElement

        const input = form.elements[0] as HTMLInputElement
        const status = input.value

        mutation.mutate({ id, status })
    }

    return (
        <div className="p-4 lg:p-20 xl:p-40">
            <table className="w-full border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-left">
                        <th className="hidden md:block">ID do Pedido</th>
                        <th>Data</th>
                        <th>Preço</th>
                        <th className="hidden md:block">Produtos</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order: Order) => (
                        <tr
                            className={cn("text-sm md:text-base bg-gray-100", {
                                'bg-red-100': order.status !== "entregue"
                            })}
                            key={order.id}
                        >
                            <td className="hidden md:block py-6 px-2">{order.id}</td>
                            <td className="py-6 px-1">{new Date(order.createdAt).toLocaleDateString("BR")}</td>
                            <td className="py-6 px-1">{order.price}</td>
                            <td className="hidden md:block py-6 px-1">{order.products[0].title}</td>
                            {session?.user.isAdmin ? (
                                <td>
                                    <form
                                        className="flex items-center"
                                        onSubmit={(e) => handleSubmit(e, order.id)}
                                    >
                                        <input
                                            name="status"
                                            placeholder={order.status}
                                            className="p-2 ring-1 ring-red-100 rounded-md"
                                        />

                                        <Button variant={'ghost'}>
                                            <EditIcon className="text-primary" />
                                        </Button>
                                    </form>
                                </td>
                            ) : (
                                <td className="py-6 px-1">{order.status}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
