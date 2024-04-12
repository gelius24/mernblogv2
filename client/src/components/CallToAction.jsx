import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Read my real blog hosted for free by wordpress.com</h2>
        <p className="text-gray-500 my-2">I write everything I learn in web developpement there !</p>
        <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none rounded-tr-none"><a href="" target="_blank" rel='noopener noreferrer'>Go to wordpress.com</a></Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://techturn.be/wp-content/uploads/2023/07/WordPress-logotype-alternative-white.png" />
      </div>
    </div>
  )
}