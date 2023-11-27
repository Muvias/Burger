import { AddressElement } from "@stripe/react-stripe-js";

interface AddressFormProps { }

export function AddressForm({ }: AddressFormProps) {
    return (
        <form className="">
            <h3 className="text-lg md:text-2xl font-bold my-8 mb-4">Endereço</h3>
            <AddressElement
                options={{ mode: 'shipping' }}
                onChange={(event) => {
                    if (event.complete) {
                        const address = event.value.address
                    }
                }}
            />
        </form>
    )
}