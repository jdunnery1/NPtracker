import {motion} from "motion/react";
const Park = ({park, modal, open, close, setActive}) => {

    return (
        <motion.div onClick={() => {modal ? close() : open(); setActive()}} whileHover={{ scale: 1.05}} whileTap={{ scale: 0.95}} className={'w-[200px] h-[300px] shadow-xl flex flex-col items-center overflow-hidden rounded-2xl min-w-[130px] max-sm:w-[95%]'}>
            <img src={park.image} alt="" className={'w-full h-3/5'}/>
            <div className={'h-2/5 w-full overflow-y-auto flex flex-col items-center mt-2 justify-center *:select-none *:cursor:pointer'}>
                <h1 className={'text-[25px]/6 text-center font-extrabold'}>{park.name}</h1>
                <h3 className={'text-[20px] font-bold'}>{park.location}</h3>
            </div>
        </motion.div>
    )
}

export default Park