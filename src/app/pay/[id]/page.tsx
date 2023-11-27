'use client'

import CheckoutForm from "@/components/CheckoutForm"
import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from "react"

interface pageProps {
    params: {
        id: string
    }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Page({ params: { id } }: pageProps) {
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/create-payment-intent/${id}`, {
                    method: 'POST'
                })

                const data = await res.json()

                setClientSecret(data.clientSecret)
            } catch (error) {
                console.log(error)
            }
        }

        makeRequest()
    }, [id])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe'
        }
    }

    return (
        <div className="">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}
