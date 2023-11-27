'use client'

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FormEvent, useEffect, useState } from "react"
import { AddressForm } from "./AddressForm"
import { Button } from "./ui/button"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export default function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break;
                case "processing":
                    setMessage("Your payment is processing.")
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break;
                default:
                    setMessage("Something went wrong.")
                    break;
            }
        })
    }, [stripe])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/success",
            },
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || 'Something went wrong!')
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsLoading(false)
    }


    return (
        <div className="flex">
            <form
                id="payment-form"
                onSubmit={handleSubmit}
                className="p-6 md:p-20 xl:p-40 flex-1"
            >
                <h1 className="text-xl md:text-3xl xl:text-5xl font-bold mb-6 xl:mb-12">Dados do cartão de crédito</h1>

                <PaymentElement
                    id="payment-element"
                    options={{ layout: "tabs" }}
                    className=""
                />

                <AddressForm />

                <Button className="mt-8" disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div><Loader2 className="animate-spin" /></div> : "Pagar agora"}
                    </span>
                </Button>

                {message && <div id="payment-message">{message}</div>}
            </form>
            <div className="relative flex-1 hidden 2xl:block">
                <Image
                    src='/stripe_payment.svg'
                    alt="Foto representando a seção de pagamento do Stripe"
                    fill
                    priority
                    sizes="40vw"
                    className="object-contain pr-20"
                />
            </div>
        </div>
    )
}
