import Modal from "../../../components/Modal"
import Button from "../../../components/Button"

const ChangeIsFavoriteModal = ({open, onClickClose, listData}) => {
    const isFavorites = listData.isFavorites

    console.log("modal", listData)
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
                    // onClickButton={onClickToCreateList}
                />
            </div>
        </Modal>
    )
}

export default ChangeIsFavoriteModal