import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img src={assets.logo} alt="" className="mb-5 w-32"/>
                <p className="w-full md:w-2/3 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus omnis molestias itaque expedita at provident dolores natus deleniti vero hic?
                </p>
            </div>

            <div className="">
                <p className="text-xl font-medium mb-5">Comapany</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+91 0987654432</li>
                    <li>eaxmple@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr className="" />
            <p className="py-5 text-sm text-center">Copright @2025 - All Right Reserved</p>

        </div>
      
    </div>
  )
}

export default Footer
