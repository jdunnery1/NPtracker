import {motion} from "motion/react";
import Backdrop from "./backdrop.jsx";
import {auth} from "../lib/authLogic.js";
import Snackbar from '@mui/material/Snackbar';
import {use, useState} from "react";
import {Alert} from "@mui/material";
import {axiosInstance} from "../lib/axios.js";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const parkDisplay = (park, user) => {

    const[visited, setVisited] = useState(user?.parks?.map((p) => p.name).includes(park.name))

    const visit = () => {
        if (!visited) {
            user.parks = [...user.parks, {...park, visitedOn: new Date().toISOString()}]
            sessionStorage.setItem('user', JSON.stringify(user))
            axiosInstance.put('/users/visit', {user: user})
            setVisited(true)
        } else {
            user.parks = user.parks.filter((p) => p.name !== park.name)
            sessionStorage.setItem('user', JSON.stringify(user))
            axiosInstance.put('/users/visit', {user: user})
            setVisited(false)
        }
    }

    return (
        <>
        <img src={park.image} className={'w-full h-2/5'} alt=""/>
        <h1 className={'text-[30px] font-bold'}>{park.name}</h1>
        <p className={'text-center px-5 overflow-y-auto'}>{park.description}</p>
        <h2 className={'font-[500]'}>Located in {park.location}</h2>
        {user.username && <button onClick={() => visit()} className={'absolute top-5 right-5 text-white font-bold border-1 border-white px-2 py-2 rounded-xl shadow-xl'} style={{background: !visited ? 'transparent' : 'white', color: !visited ? 'white' : 'black'}}>{!visited ? 'Visit?' : 'Visited!'}</button>}
        </>
    )
}

const loginDisplay = (setFunc, close, setSnack) => {

    return (
        <div className={'w-full h-full p-5 flex flex-col items-center'}>
            <img src="/logo.png" alt="" className={'w-30'}/>
            <h1 className={'text-[20px] mt-3 text-center font-bold'}>Welcome to National Park Tracker!</h1>
            <h2 className={'text-[18px] mt-[-5px] w-full text-center'}>Please login to track progress</h2>
            <input className={'mt-5 text-[20px] pb-2 border-b-1 outline-none'} type="text" placeholder={'Username'}/>
            <input className={'mt-5 text-[20px] pb-2 border-b-1 outline-none'} type="text" placeholder={'Password'}/>
            <motion.button onClick={() => auth('login', setFunc, close, setSnack)} whileTap={{scale: 0.95, background: 'rgb(170, 170, 170)'}} className={'mt-5 text-[20px] px-5 py-3 shadow-xl rounded-xl border-b-2'}>Login</motion.button>
            <motion.button onClick={() => auth('signup', setFunc, close, setSnack)} whileTap={{scale: 0.95, background: 'rgb(170, 170, 170)'}} className={'mt-6 px-4 py-2 shadow-xl rounded-xl border-b-2'}>Sign Up</motion.button>
        </div>
    )
}

const trackDisplay = () => {

    return (
        <div></div>
    )
}



const Modal = ({handleClose, park, setUser, user, visitPark}) => {

    const[snack ,setSnack] = useState({open: false, message: '', success: false})
    let vertical = 'top'
    let horizontal = 'center'



    return (
        <Backdrop onClick={handleClose}>
            <motion.div className={'w-3/10 h-3/4 bg-white rounded-3xl relative overflow-hidden flex flex-col items-center justify-between pb-5 min-w-[248px] max-sm:w-[95%] max-sm:h-[60%]'} onClick={(e) => e.stopPropagation()} variants={dropIn} initial={'hidden'} animate={'visible'} exit={'exit'}>
                {!park?.name ? loginDisplay(setUser, handleClose, setSnack) : parkDisplay(park, user)}
            </motion.div>
            <Snackbar autoHideDuration={1500} anchorOrigin={{vertical, horizontal}} open={snack.open} onClose={() => setSnack({open: false, message: '', success: false})}><Alert variant={'filled'} severity={snack.success ? 'success' : 'error'}>{snack.message}</Alert></Snackbar>
        </Backdrop>
    )
}

export default Modal

