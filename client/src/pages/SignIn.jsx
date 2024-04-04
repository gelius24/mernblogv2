import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to={"/"} className="bold dark:text-white text-4xl">
            Woody's Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project you can sign up with your email and create a
            password or use google
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <div className="">
            <form className="flex flex-col gap-4">
              <div>
                <Label value="Your username" />
                <TextInput type="text" placeholder="username" id="username" />
              </div>
              <div>
                <Label value="Your email" />
                <TextInput type="email" placeholder="email" id="email" />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput type="password" placeholder="password" id="password" />
              </div>
              <Button gradientDuoTone='purpleToPink' type="submit">Sign Up</Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to={'/sign-in'} className="text-blue-500">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
