import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  )
}
