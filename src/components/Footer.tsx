import Link from "next/link";

interface FooterProps { }

export function Footer({ }: FooterProps) {
    return (
        <div className="flex justify-between items-center py-6 px-4 sm:px-20 gap-4 text-primary border-t">
            <Link
                href='/'
                className="text-xl sm:text-2xl font-bold"
            >
                MASSIVO
            </Link>

            <p className="">@copy Vinicius P.</p>
        </div>
    )
}
