import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer class="bg-black text-white w-full  py-2 shadow   ">
    <div class="w-full  max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm  sm:text-center ">© 2023 <Link href="https://flowbite.com/" class="hover:underline">Food Reuse</Link>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium   sm:mt-0">
        <li>
            <Link to="/about" class="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
            <Link to="/" class="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
            <Link to="/" class="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
            <Link to="/" class="hover:underline">Contact</Link>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer
