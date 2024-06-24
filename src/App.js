import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart"
import { useSelector } from "react-redux";
import Setting from "./components/core/Dashboard/Setting";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Contact from "./pages/Contact";






function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">

      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route 
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/update-password/:id"
          element={<UpdatePassword />}
         />

         <Route 
            path="/verify-email"
            element={<VerifyEmail/>}
          />

          <Route
            path="/about"
            element={<About/>}
          />
          
          <Route 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
                
              
            }
          >

            <Route path="/dashboard/my-profile" element={<MyProfile/>} />

            {
              user?.accountType === "Student" && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  <Route path="/dashboard/cart" element={<Cart />} />
                </>
              )
            }

            <Route path="dashboard/setting" element={<Setting />} />

            {
              user?.accountType === "Instructor" &&  (
                <>
                 <Route path="/dashboard/add-course" element={<AddCourse />} />
                 <Route path="/dashboard/my-courses" element={<MyCourses />} />
                 <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
                 <Route path="/dashboard/instructor" element={<Instructor />} />
                </>
              )
            }

          </Route>

          

            <Route 
              element={
                <PrivateRoute>
                  <ViewCourse />
                </PrivateRoute>
              }
              >

              {
                user?.accountType === "Student" && (
                  <>
                    <Route  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
                            element={<VideoDetails />}
                    />
                  </>
                )
              }

              </Route>


      </Routes>

      
    </div>
  );
}

export default App;
