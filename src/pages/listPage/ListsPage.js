import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { makeStyles } from '@material-ui/styles';
import Button from "../../components/Button";
import {routeNames} from "../../constants/routeNames"
import RecipeReviewCard from "../../components/ListCard"
import Input from "../../components/Input"
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Tooltip from "../../components/Tooltip"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        maxWidth: "100vw",
    },
    titleWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
    },
    topTitle: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "4fr 4fr 4fr",
        alignItems: "center",
    },
    listWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    listItem: {
        padding: "15px",
    },
    bottomButton: {
        cursor: "pointer",
        display: "inline-block"
    }
}));

const ListsPage = () => {
    const classes = useStyles()
    const dispatch=useDispatch()
    const history = useHistory()
    const {lists} = useSelector((state) => state?.lists)
    const [searchText, setSearchText] = useState('')

    const onClickToCreateList = () => history.push(routeNames.ROUTE_CREATE_LIST)
    const onChangeSearchText = (e) => setSearchText(e.target.value)
    console.log(searchText)

    return (
        <div className={classes.root}>
            {!lists?.length ? 
                <div className={classes.titleWrapper}>
                    <h4>You don't have any lists yet. Start creating your lists.</h4>
                    <Button buttonText="Create your first list"
                        variant="contained"
                        color="primary"
                        onClickButton={onClickToCreateList}
                    />
                </div>
                :
                <div>
                    <div className={classes.topTitle}>
                        <Input label="Search"
                            onChangeInput = {(e) => onChangeSearchText(e)}
                        />
                        <h4>Your lists</h4>
                        <div className={classes.titleWrapper}>
                            <Button buttonText="Create new list"
                            variant="contained"
                            color="primary"
                            onClickButton={onClickToCreateList}
                            />
                        </div>
                    </div>
                    
                    <div className={classes.listWrapper}>
                        {lists?.map((list) => {
                            return (
                                <div className={classes.listItem} key={list._id}>
                                    <RecipeReviewCard listData={list} />
                                </div>
                            )
                        })}
                    </div>
                    
                    <Tooltip title="Create new list"
                        placement="bottom"
                        arrow={true}>
                            <div className={classes.bottomButton}>
                                <LibraryAddIcon color="primary" onClick={onClickToCreateList}/>
                            </div>
                    </Tooltip>
                </div>
            }
        </div>
    )
}

export default ListsPage
