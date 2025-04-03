import {axiosInstance} from "./axios.js";

export const auth = (type, setFunc, closeModal, snack) => {
    let e = event.target.parentNode

    let username = e.children[3].value.toLowerCase()
    let password = e.children[4].value.toLowerCase()

    if (username !== '' && password.value !== '') {
        if (type === 'login') {
            axiosInstance.get(`/users/auth?username=${username}&password=${password}`).then((res) => {
                if (res.data !== null) {
                    setFunc(res.data)
                    closeModal()
                } else {
                    snack({open: true, message: "Oops! Looks like you don't have an account", success: false})
                }
            })
        } else {
            let user = {username: username.toLowerCase(), password: password.toLowerCase(), parks: []}
            axiosInstance.post('/users/create', {user: user}).then((res) => {
                console.log(res.data.success)
                if(res.data.success) {
                    snack({open: true, message: 'Account Created!', success: true})
                } else {
                    snack({open: true, message: 'That account already exists', success: false})
                }
            })
        }
    }

    e.children[3].value = ''
    e.children[4].value = ''
}
