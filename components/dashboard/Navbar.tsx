import { UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <div className="w-full flex justify-between px-5 py-3 border">
        <h1 className="font-bold">Chat with PDF</h1>
      <UserButton />
    </div>
  )
}

export default Navbar
