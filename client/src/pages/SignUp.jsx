import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // trim remove spaces
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password)
      return setErrorMessage("You must fill all field.");
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) return setErrorMessage(data.message);
      setIsLoading(false);
      navigate('/sign-in')
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your username" />
                <TextInput
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="email"
                  placeholder="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={isLoading}
              >
                {!isLoading ? (
                  "Sign Up"
                ) : (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to={"/sign-in"} className="text-blue-500">
                Sign In
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
