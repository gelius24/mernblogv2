# FULL STACK MERN BLOG WITH REDUX AND TAILWINDCSS.

## A -> FRONTEND PART

* npm create vite@latest (Javascript + SWC a super-fast Ts/Js compiler written in Rust.)

* install tailwind css (vite and react google search)

* pckgs = [react-router-dom, redux, firebase, flowbite-react, moment, react-circular-progressbar, react-icons react-quill]

* PAGES AND ROUTES CONFIG with react-router-dom in App.jsx with {BrowserRouter, Routes, Route}

* Google OAuth (firebase) in OAuth.jsx (continue with google btn) and firebase.js file.

* Redux: [store.js, userSlice.js & themeSlice.js] I only manage user and theme state.

* Dark/Light Theme handled by Redux, my ThemeProvider.jsx file and in the header in the button with dispatch(toogleTheme())

## B -> BACKEND PART

* npm init -y

* pckgs = [bycryptjs, cookie-parser, cors, dotenv, express, jwt, mongoose]

* backend structure: [api-folder]->[controller, models, routes, utils, index.js]

* **models** is where reside the schema and model of mongoose for user, post and comments.

#### MongoDB

The **tables** are COLLECTIONS
The **rows** are DOCUMENTS

#### mongoose

Schema: gives documents structure {username: {type: String, required: true, unique: true}}<br>    model(Schema, 'User'): give the interface to do CRUD operation in mongoDB collections

* **controller & routes** folders work together. The **routes** are the available urls of the backend. for exemple: 
```
 router.get('<...>/getcomments', fetchComments)
``` 
fetchComments here is in **controller**. Controllers have multiple async (req, res, next) => {} functions. <br> The methods I used from mongoose models in controller are :<br>[findOne(), find().sort().skip().limit(), findById() ...andUpdtate/andDelete, countDocument(), save()]<br> the .\_doc prop give a js object representing the document of the model. <br>I worked with cookies: 
```
res.clearCookie('acces_token').status(200).json('User disconnected.')
```
I worked with the parameters in the url: req.query.limit or req.params.userID for exemples. 
> /user/getusers?limit=2 or /user/:userID

* Authentification (token given when user is login in and used in future requests) is made with `token = jwt.sign({id, isAdmin, process.env.JWT_SECRET})` the response is sent with 
```
res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
// rest is the user without his password
``` 

* The authentification is made with **verifyToken() inside the utils folder** with jwt.verify()
```
export const verifyToken = (req,res,next) => {
const token = req.cookies.access_token;
if (!token) return next(errorHandler(401, 'Unauthorized (no token provided).'))
jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
if (err) return next(errorHandler(401, 'Unauthorized (the token didnt pass the test !).'))
req.user = user
next();
})
}
```

