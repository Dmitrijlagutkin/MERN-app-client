import api from "../http/index"

export const addList = async (listTitle, date, category, listItem, isFavorites) => {
    const response = await api.post("/list", {
        listTitle,
        date,
        category,
        listItem,
        isFavorites
    })
    return response
}
