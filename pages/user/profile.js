import Footer from "@/components/Footer"
import Header from "@/components/Header"

const ProfileScreen = () => {
  return (
    <div>
      <Header />
      <div className='p-6 flex justify-start items-start flex-col h-screen'>
      <div className='p-4 flex justify-between w-screen'>
        <h1 className='py-5 px-8 text-4xl'>My Account</h1>
        <button className='py-3 px-8 text-3xl rounded-md border-2 bg-gray-300 hover:opacity-80'>Log Out</button>
      </div>
      <div>
      <div>
          <h2>Name</h2>
          <h6>name here</h6>
        </div>
        <div>
          <h2>Shipping Address</h2>
          <h6>Shipping Address here</h6>
          <button className='py-2 px-4 text-lg rounded-md border-2 bg-gray-300 hover:opacity-80'>Update Shipping Address</button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
export default ProfileScreen