import api from "../http/index"

export const addList = async (listTitle, date, category) => {
    const response = await api.post("/list", {
        listTitle,
        date,
        category
    })
    return response
}

// export const registration = async (email, password) => {
//     const response = await api.post("/registration", { email, password })
//     return response
// }

// export const logout = async () => {
//     const response = await api.post("/logout")
//     console.log("logout", response)
//     return response
// }