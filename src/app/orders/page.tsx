interface pageProps { }

export default function Page({ }: pageProps) {
    return (
        <div className="p-4 lg:p-20 xl:p-40">
            <table className="w-full">
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
                    <tr className="text-sm md:text-base odd:bg-gray-100">
                        <td className="hidden md:block py-6 px-1">21323214213421</td>
                        <td className="py-6 px-1">21.11.2023</td>
                        <td className="py-6 px-1">89,90</td>
                        <td className="hidden md:block py-6 px-1">Big Burger (2), Pizza Vegana (2), Coca Cola 2L</td>
                        <td className="py-6 px-1">Entregue</td>
                    </tr>
                    <tr className="text-sm md:text-base odd:bg-gray-100">
                        <td className="hidden md:block py-6 px-1">21323214213421</td>
                        <td className="py-6 px-1">21.11.2023</td>
                        <td className="py-6 px-1">89,90</td>
                        <td className="hidden md:block py-6 px-1">Big Burger (2), Pizza Vegana (2), Coca Cola 2L</td>
                        <td className="py-6 px-1">Entregue</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
