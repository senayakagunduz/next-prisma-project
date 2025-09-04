import React, { Suspense } from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import LinksDropdown from "./LinksDropdown";
import DarkMode from './DarkMode';
import {Pacifico} from 'next/font/google'
import MobileMenu from "./MobileMenu";

const pasifico = Pacifico({ subsets: ["cyrillic"], weight: "400" })
function Navbar() {
  return (
    <nav className="border-b">
      <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4'>
        <Logo />
        <h2 className={`${pasifico.className} text-xl`}>ECommerce</h2>
        {/*Suspence ile NavSearch bileşeni verileri alana ya da yüklenene kadar "Loading..." mesajı gösterilecektir. */}
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className='flex gap-4 items-center'>
          <CartButton />
          <DarkMode />
          <LinksDropdown />
          <MobileMenu/>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
