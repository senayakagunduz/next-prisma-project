import React from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import LinksDropdown from "./LinksDropdown";
import LightMode from "./LightMode";
import Darkmode from "./DarkMode";
import { Suspense } from "react";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 ">
        <Logo />
        {/*Suspence ile NavSearch bileşeni verileri alana ya da yüklenene kadar "Loading..." mesajı gösterilecektir. */}
        <Suspense fallback={<div>Loading...</div>}> 
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <Darkmode />
          <LightMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
