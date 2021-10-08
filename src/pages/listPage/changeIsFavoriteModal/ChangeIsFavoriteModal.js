import {useState} from "react"
import { useDispatch } from "react-redux"
import Modal from "../../../components/Modal"
import Button from "../../../components/Button"
import {updateList} from "../../../store/listsSlice"
import { useDate } from "../../../hooks/useDate"

const ChangeIsFavoriteModal = ({open, onClickClose, listData, userId}) => {
    const dispatch = useDispatch()
    const date = useDate()
    const isFavorites = listData.isFavorites

    const onClickUpdateList = () => {
        dispatch(updateList({listTitle: listData.listTitle, 
            date, 
            category: listData.category, 
            listItem: listData.tempListItem, 
            isFavorites: !isFavorites,
            id: listData._id,
            userId}))
        onClickClose()
    }
    return (
        <Modal withHeader={true}
            onClickClose={onClickClose}
            open={open}
            title={isFavorites ? "Remove from favorites" : "Add to favourites"}
        >
            <div>
                <Button buttonText={isFavorites ? "Remove from favorites" : "Add to favourites"}
                    variant="contained"
                    color="primary"
                    onClickButton={onClickUpdateList}
                />
            </div>
        </Modal>
    )
}

export default ChangeIsFavoriteModal