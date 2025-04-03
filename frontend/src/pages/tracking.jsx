import {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios.js";
import {motion} from "motion/react";
import {data, useNavigate} from "react-router-dom";
import {PieChart} from '@mui/x-charts'

const Tracking = () => {

    const[user, setUser] = useState({})
    const[parks, setParks] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
        axiosInstance.get('/parks/').then((res) => setParks(res.data))
    }, []); // get user from storage
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user))
    }, [user]); // update user when change



    return (
        <div id={'tracking-app'} className={'w-full h-full relative'}>
            <div className={'w-full h-2/5 shadow-xl px-5 py-2 flex justify-around items-center'}>
                <PieChart className={'relative'}
                    series={[{
                        data: [
                            {value: user?.parks?.length, color: 'green'},
                            {value: parks.length-user?.parks?.length, color: 'white'}
                        ],
                        innerRadius: 55,
                        paddingAngle: 5,
                        cornerRadius: 5
                    }]}
                    width={300}
                          height={300}
                />
                <div className={'w-1/2 h-full flex flex-col justify-around items-center'}>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={'text-[40px] font-bold'}>{user?.parks?.length}/{parks.length}</h1>
                        <h2 className={'text-[30] font-[400]'}>Parks Visited So Far</h2>
                    </div>
                    <h2 className={'text-[30px]'}>That's only {parks.length - user?.parks?.length} left to go!</h2>
                </div>
            </div>
            <div className={'px-5 py-2 h-3/5 overflow-y-auto py-5'}>
                {user?.parks?.map((park) => {
                    return (
                        <div className={'w-full h-3/5 max-sm:h-fit rounded-xl shadow-xl mb-10 pt-3 px-3 flex max-sm:flex-col'}>
                            <img src={park.image} className={'rounded-xl w-1/4 h-full max-sm:w-full max-sm:h-1/2 max-sm:mt-2'} alt=""/>
                            <div className={'flex flex-col px-5 py-5'}>
                                <div className={'flex justify-between max-sm:items-center'}>
                                    <h1 className={'font-bold text-[20px]'}>{park.name}</h1>
                                    <h1 className={'font-bold text-[20px] max-sm:text-[10px]'}>Visited On {new Date(park.visitedOn).toDateString()}</h1>
                                </div>
                                <p className={'mt-5 overflow-y-auto w-2/3 max-sm:w-full max-sm:mt-2'}>{park.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <motion.button onClick={() => navigate('/')} whileHover={{scale: 1.05}} whileTap={{ scale: 0.95, background: 'rgb(170, 170, 170)'}} className={'bg-white select-none fixed bottom-5 left-5 px-5 py-3 rounded-xl shadow-xl'}>Back</motion.button>
        </div>
    )
}

export default Tracking