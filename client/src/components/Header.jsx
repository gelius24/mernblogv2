import { Navbar, TextInput, Button, NavbarToggle } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon} from 'react-icons/fa'
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        Woody's Blog
      </Link>
      <form>
        <TextInput
        className="hidden lg:inline"
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" pill color='gray'><AiOutlineSearch /></Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
          <FaMoon />
        </Button>
        <Link to={'/sign-in'}>
          <Button gradientDuoTone='purpleToBlue'>SignIn</Button>
        </Link>
        <NavbarToggle />
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to={'/'}>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to={'/about'}>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to={'/projects'}>Project</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  );
}
