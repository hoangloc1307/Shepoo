import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface CartLayoutProps {
  children?: React.ReactNode
}

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
