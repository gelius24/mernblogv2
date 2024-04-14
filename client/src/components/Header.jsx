import { Navbar, TextInput, Button, NavbarToggle, Dropdown, Avatar } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon, FaSun} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {toogleTheme} from "../redux/theme/themeSlice"
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation()
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`)
  }

  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center"
      >
        <span className="border border-black dark:border-white p-1 rounded-md">Woody's</span> Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
        className="hidden lg:inline"
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
