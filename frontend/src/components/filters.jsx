import {motion} from "motion/react";
import '../styles/filters.css'

const Filters = () => {

    return (
        <motion.div id={'filters-window'} className={'w-[150px] h-[200px] fixed shadow-xl border-1 rounded-xl bg-white px-2 py-5'}>
            <h2>Filter by: State</h2>
        </motion.div>
    )
}

export default Filters