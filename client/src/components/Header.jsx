import { Navbar, TextInput, Button, NavbarToggle, Dropdown, Avatar } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon, FaSun} from 'react-icons/fa'
import { Link, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {toogleTheme} from "../redux/theme/themeSlice"
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {method: 'POST'})
      const data = await res.json();
      if (!res.ok)
        console.log(data.message)
      else
        dispatch(signoutSuccess())
    } catch (error) {
      console.log(error)
    }
  }

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
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill onClick={() => dispatch(toogleTheme())}>
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded  />}>
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        )
      :
      (
        <Link to={'/sign-in'}>
        <Button gradientDuoTone='purpleToBlue' outline>SignIn</Button>
      </Link>
      )
      }
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
