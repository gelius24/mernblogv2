# FULL STACK MERN BLOG WITH REDUX AND TAILWINDCSS.

## A -> FRONTEND PART

> npm create vite@latest (Javascript + SWC a super-fast Ts/Js compiler written in Rust.)

> install tailwind css (vite and react google search)

> pckgs = [react-router-dom, redux, firebase, flowbite-react, moment, react-circular-progressbar, react-icons react-quill]

> PAGES AND ROUTES CONFIG with react-router-dom in App.jsx with {BrowserRouter, Routes, Route}

> Google OAuth (firebase) in OAuth.jsx (continue with google btn) and firebase.js file.

> Redux: [store.js, userSlice.js & themeSlice.js] I only manage user and theme state.

> Dark/Light Theme handled by Redux, my ThemeProvider.jsx file and in the header in the button with dispatch(toogleTheme())

## B -> BACKEND PART

> npm init -y

> pckgs = [bycryptjs, cookie-parser, cors, dotenv, express, jwt, mongoose]

> backend structure: [api-folder]->[controller, models, routes, utils, index.js]

> **controller & routes** folders work together. The **routes** are the available urls of the backend. router.get('<...>/getcomments', fetchComments). The actions of the differents route (fetchComments here) are in **controller**. What I just called actions are async (req, res, next) => {} functions.
> The methods I used from mongoose models there are : [findOne(), find().sort().skip().limit(), findById() ...andUpdtate/andDelete, countDocument(), save()] the .\_doc prop give a js object representing the document of the mondel.
> I worked with cookies: `res.clearCookie('acces_token').status(200).json('User disconnected.')`
> I worked with the params in the url: req.query.limit or req.params.userID for exemples. (/user/getusers?limit=2), (/user/:userID)

> **models** is where reside the schema and model of mongoose for user, post and comments.

### MongoDB

The **tables** are COLLECTIONS
The **rows** are DOCUMENTS

### mongoose

Schema: donne la forme des docs {username: {type: String, required: true, unique: true}}
model(Schema, 'User'): interface qui permet l'intération (CRUD) avec une collection sur MongoDB. Create: save(), Read: find(), Update: findByIdAndUpdate() & Delete: findBIdAndDelete()

> Authentification (token given when user is login in and used in future requests) is made with token = jwt.sign({id, isAdmin, process.env.JWT_SECRET}). the response is sent with `res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)` (rest being the user without his password)
> The authentification is made with **verifyToken() inside the utila folder**
> `// if no token or invalid token use my error middleware,
> // if valid token add user to the request
> // then next() here is updateUser for example since verifyToken is used in mutliple routes
> export const verifyToken = (req,res,next) => {
> const token = req.cookies.access_token;

if (!token) return next(errorHandler(401, 'Unauthorized (no token provided).'))
jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
if (err) return next(errorHandler(401, 'Unauthorized (the token didnt pass the test !).'))
req.user = user
next();
})
}`
