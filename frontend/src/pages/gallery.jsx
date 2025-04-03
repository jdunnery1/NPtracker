import {axiosInstance} from "../lib/axios.js";
import {use, useEffect, useState} from "react";
import Park from "../components/park.jsx";
import {motion} from "motion/react";
import {AnimatePresence} from 'motion/react'
import Modal from "../components/modal.jsx";
import Filters from "../components/filters.jsx";
import {animate, hover} from "motion";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Gallery = () => {

    const[modalOpen, setModal] = useState(false)
    const[active, setActive] = useState({})
    const[user, setUser] = useState({})
    const[parks, setParks] = useState([])
    const[query, setQuery] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
        axiosInstance.get('/parks/').then((response) => setParks(response.data))
    }, []);

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user))
    }, [user]);


    const logout = () => {
        if (user.username) {
            setUser({})
            setSnack(true)
        }
    }
    const[showLogout, setLogout] = useState(false)
    hover('#nav-right-btn', (el) => {setLogout(true); return () => setLogout(false)})
    const[snackOpen, setSnack] = useState(false)

    return (
        <div className={'w-full h-full flex items-center justify-center flex-col '}>
            <div id={'nav'} className={'w-full h-1/10 shadow-xl flex justify-between items-center px-5 *:select-none'}>
                <div id={'nav-left'} className={'flex'}>
                    <motion.input whileHover={{scale: 1.25, x: 15}} whileTap={{scale: 0.99}} id={'input-query'} onChange={(e) => setQuery(event.target.value)} type="text" placeholder={'Search Parks'} className={'border-b-1 outline-none pb-1'}/>
                    <h1 id={'filters-title'} className={'ml-10 mr-10 relative max-sm:hidden'}>Filters<Filters/></h1>
                    <h1 onClick={() => user.username ? navigate('/track') : setModal(true)} className={'max-sm:ml-5'}>Tracking</h1>
                </div>
                <div id={'nav-right'}>
                    <motion.div id={'nav-right-btn'} onClick={() => {setModal(!user?.username); setActive(null); logout()}} whileHover={!user?.username ? {scale: 1.05} : {scale: 1.05, width: 200}} whileTap={{ scale: 0.95, background: "rgb(150,150,150)"}} className={'px-5 py-2 rounded-xl shadow-xl overflow-hidden hover:flex hover:justify-between items-center'}>{!user?.username ? 'Login' : user.username}
                        {user?.username && showLogout && <motion.span initial={{scale: 0}} animate={{scale:1}} className={'text-[10px] text-red-400'}>X Log out</motion.span>}
                    </motion.div>
                </div>
            </div>
            <div id={'scrollable'} className={'w-full h-full overflow-y-auto flex flex-wrap justify-center gap-3 pb-5 pt-5 px-10'}>
                {parks.filter((p) => {
                    let allowed = false
                    if (query !== '') {
                        allowed = p.name.toLowerCase().includes(query.toLowerCase())
                    } else { allowed = true}
                    return allowed
                }).map((park) => <Park setActive={() => setActive(park)} modal={modalOpen} open={() => setModal(true)} close={() => setModal(false)} key={park.name.replace(' ', '')} park={park}/>)}
            </div>
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {modalOpen && <Modal user={user} setUser={(user) => setUser(user)} park={active} modalOpen={modalOpen} handleClose={() => {setModal(false)}}/>}
            </AnimatePresence>
            <Snackbar autoHideDuration={1500} open={snackOpen} onClose={() => setSnack(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}}><Alert severity={'warning'} variant={'filled'}>You've been logged out</Alert></Snackbar>
        </div>
    )
}

export default Gallery