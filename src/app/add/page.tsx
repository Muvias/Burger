'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Option = {
    title: string
    additionalPrice: number
}

type Inputs = {
    title: string
    description: string
    price: number
    categorySlug: string
}

export default function Page() {
    const { data: session, status } = useSession()

    const [inputs, setInputs] = useState<Inputs>({
        title: '',
        description: '',
        price: 0,
        categorySlug: '',
    })
    const [option, setOption] = useState<Option>({
        title: '',
        additionalPrice: 0
    })
    const [options, setOptions] = useState<Option[]>([])
    const [file, setFile] = useState<File>()

    const router = useRouter()

    if (status === 'loading') return <div><Loader2 className="animate-spin" /></div>
    if (status === 'unauthenticated' || !session?.user.isAdmin) return router.push('/')

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleChangeOptions(e: React.ChangeEvent<HTMLInputElement>) {
        setOption((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement
        const item = (target.files as FileList)[0]

        setFile(item)
    }

    async function upload() {
        const data = new FormData()
        data.append('file', file!)
        data.append('upload_preset', 'restaurant')

        const res = await fetch("https://api.cloudinary.com/v1_1/drt8dpljo/image/upload", {
            method: 'POST',
            body: data
        })

        const resData = await res.json()

        return resData.url
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const url = await upload()
            const res = await fetch('http://localhost:3000/api/products', {
                method: "POST",
                body: JSON.stringify({
                    image: url,
                    ...inputs,
                    options
                })
            })

            const data = await res.json()

            // router.push(`/product/${data.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className="flex flex-wrap gap-4 p-8 shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-2xl uppercase font-bold">Adicionar Novo Produto</h1>
                <div className="flex flex-col gap-2 w-full">
                    <label>Imagem</label>
                    <input type="file" onChange={handleChangeImg} className="p-2 rounded-sm ring-1 ring-red-200" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Título</label>
                    <input onChange={handleChange} type="text" name="title" className="p-2 rounded-sm ring-1 ring-red-200" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Descrição</label>
                    <textarea name="description" className="p-2 rounded-sm ring-1 ring-red-200" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Preço</label>
                    <input onChange={handleChange} type="number" name="price" className="p-2 rounded-sm ring-1 ring-red-200" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Categoria</label>
                    <input onChange={handleChange} type="text" name="categorySlug" className="p-2 rounded-sm ring-1 ring-red-200" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Opções</label>
                    <div className="flex gap-4">
                        <input onChange={handleChangeOptions} type="text" name="title" placeholder="Título" className="p-2 rounded-sm ring-1 ring-red-200" />
                        <input onChange={handleChangeOptions} type="number" name="additionalPrice" placeholder="Preço adicional" className="p-2 rounded-sm ring-1 ring-red-200" />
                    </div>

                    <div
                        className={buttonVariants({ className: 'self-start cursor-pointer', size: 'sm' })}
                        onClick={(e) => setOptions(prev => [...prev, option])}
                    >
                        Adc Opção
                    </div>
                </div>

                <div className="flex gap-4">
                    {options.map((opt) => (
                        <div
                            className="flex gap-2 p-2 rounded-md ring-1 ring-red-500 cursor-pointer"
                            key={opt.title}
                            onClick={() => setOptions(options.filter(item => item.title !== opt.title))}
                        >
                            <span>{opt.title}</span>
                            <span>+R${opt.additionalPrice}</span>
                        </div>
                    ))}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                >
                    Enviar
                </Button>
            </form>
        </div>
    )
}
