export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 ">
        <div className="">
          <h1 className="text-3xl font-semibold text-center my-7">About this website</h1>
          <div className="flex flex-col gap-6 text-md text-gray-500">
            <p>Welcome to my website. I created it by following a tutorial on YouTube of almost 12 hours long ! This web app created with the MERN stack use multiples tools like tailwindcss, redux, react-router-dom, bcryptjs, jwt and firebase.</p>
            <p>I plan to redo this website in the future by my own. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eaque?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, voluptatem! Quas deleniti modi explicabo beatae?</p>
          </div>
        </div>
      </div>
    </div>
  )
}