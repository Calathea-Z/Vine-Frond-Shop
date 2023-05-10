import Footer from "@/components/Footer"
import Header from "@/components/Header"

const ProfileScreen = () => {
  return (
    <div>
      <Header />
      <div className='p-4 flex justify-between items-center'>
        <h1 className='py-6 px-8 text-4xl'>My Account</h1>
        <button className='py-6 px-8 text-3xl'>Log Out</button>
      </div>
      <div className="hidden sm:flex w-[90%] border-gray-300 border-[1px] justify-center items-center mx-auto" />
      <div>
        
      </div>
      <Footer />
    </div>
  )
}
export default ProfileScreen