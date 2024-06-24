import { useDispatch, useSelector } from "react-redux"
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../slices/cartSlice";
import {ReactStars} from "react-rating-stars-component"


const Cart  = () => {

    const {total, totalItem} = useSelector((state) => state.cart)
    const {cart} = useSelector((state => state.cart))
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        console.log("Bougth this course", courses)
        // TODO: API-Integrate -> payment gateway tk le jayegi
    }
    
    return(
        <div>
            <h1>Your Cart</h1>
            <p>{totalItem} Cpourse in Cart</p>
            {
                total > 0 ? (
                    <div>
                        <div>
                            {
                                cart.map((course, index) => {
                                    <div className="flex gap-4">

                                        {/* RenderCartCourses */}
                                        <div>

                                            <div>
                                                <img src={course.thumbnail} />
                                                <div>
                                                    <p>{course?.courseName}</p>
                                                    <p>{course?.category?.name}</p>
                                                    <div>
                                                        <span>4.8</span>
                                                        {/* <ReactStars 
                                                            count={5}
                                                            size={20}
                                                            edit={false}
                                                            activeColor="ffd700"
                                                            emptyIcon={<GiNinjaStar />}
                                                            fullIcon={<GiNinjaStar />}
                                                        /> */}

                                                        <span>{course?.ratingAndReviews?.length} Rating</span>


                                                    </div>
                                                </div>

                                            </div>
                                            <div>

                                                <button onClick={() => dispatch(removeFromCart(course._id))}>
                                                    <RiDeleteBin6Line />
                                                    <span>Remove</span>
                                                </button>
                                                <p>Rs {course?.price}</p>

                                            </div>
                                        </div>

                                        {/* RenderTotalAmount */}
                                        <div>
                                             
                                            <p>Total</p>
                                            <p>Rs {total}</p>

                                            <button onClick={handleBuyCourse}>
                                                Buy Now
                                            </button>
                                        </div>

                                    </div>
                                    
                                })
                            }
                        </div>
                    </div>
                ) : ( 
                    <div>
                        <p>Your CArt is Empty</p>
                    </div>
                )

            }
        </div>
    )
}

export default Cart