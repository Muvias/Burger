export type Menu = {
    id: string
    slug: string
    title: string
    description?: string
    image?: string
    color: string
}[]

export type Product = {
    id: string
    title: string
    description?: string
    image?: string
    price: number
    options?: { title: string; additionalPrice: number }[]
}

export type Order = {
    id: string
    userEmail: string
    price: number
    products: CartItem[]
    status: string
    createdAt: Date
    intent_id?: String
}

export type CartItem = {
    id: string
    title: string
    image?: string
    price: number
    optionTitle?: string
    quantity: number
}

export type Cart = {
    products: CartItem[]
    totalItems: number
    totalPrice: number
}

export type Action = {
    addToCart: (item: CartItem) => void
    removeFromCart: (item: CartItem) => void
}