import Navbar from "@/components/dashboard/Navbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
        <Navbar />
      {children}
    </div>
  )
}

export default layout
