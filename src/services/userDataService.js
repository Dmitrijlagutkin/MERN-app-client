import api from "../http/index"

export const fetchUserData = async (email, password) => {
    const response = await api.get("/userData", { email, password })
    return response
}
