This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# TODO: Project Software engineering

### Models / DataBase
- [x] UserSchema
- [x] UserCoursesSchema
- [x] CourseSchema
- [x] UserSessionSchema
- [x] DataBase connected to cloud.mongodb.com

### Backend functions
- [x] Login
- [x] HashedPassword
- [x] Authentification middleware 
- [x] SecureLogout
- [x] Scraping Courses from ius and adding into DB
- [ ] Implement admin/teacher/student level of access
- [ ] ?
- [ ] ?

#### End points
- [x] `/users/login`
- [x] `/users/logout`
- [x] `/users/signup`
- [x] `/users/auth` (=> check the user is properly authentificated)
- [x] `/courses/add`
- [x] `/courses/update`
- [x] `/courses/scraping-courses-from-ius` (=>This one is VERY performance consumming)


### FrontEnd functions
- [x] Navbar (Login/SignUp/Logout)
- [x] LoginForm
- [ ] SignUp Form (need to be improve)


# Installation

```
git clone https://github.com/axel0070/online_enrollment
cd online_enrollment
```
### Start frontEnd

```
npm install
npm run build
```
### Start Backend

```
cd backend
nodemon server
```