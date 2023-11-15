interface NotificationProps {}

export function Notification({}: NotificationProps) {
    return (
        <div className="p-2 text-sm text-center leading-relaxed shadow-md bg-primary/90 text-white">
            <p>Taxa de entrega grátis para todos os pedidos acima de R$50. Peça sua comida agora!</p>
        </div>
    )
}
