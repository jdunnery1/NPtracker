import {motion} from "motion/react";

const Backdrop = ({children, onClick}) => {

    return (
        <motion.div className={'w-full h-full fixed flex justify-center items-center'} style={{background: 'rgba(70, 70, 70, 0.7)'}} onClick={onClick} initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}}>
            {children}
        </motion.div>
    )
}

export default Backdrop