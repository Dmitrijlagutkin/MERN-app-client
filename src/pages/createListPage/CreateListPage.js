import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Input from "../../components/Input";
import Button from "../../components/Button"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from "../../components/Tooltip";
import {addNewList} from "../../store/listsSlice"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import {useDate} from "../../hooks/useDate"
import { routeNames } from "../../constants/routeNames";
import Select from "../../components/Select"
import ListItem from "./CreateListItem"
import {setTempListItem} from "../../store/listsSlice"
import CheckBox from "../../components/CheckBox"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        maxWidth: "100vw",
    },
    headerWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "4fr 4fr 4fr",
        alignItems: "center",
    },
    inputTitleWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        cursor: "pointer",
    },
    confirmTitle: {
        marginRight: "10px",
        color: "#3f51b5",
    },
    createListButton: {
        display: "inline-block",
        marginTop: "25px"
    },
    itemsList: {
        marginBottom: "30px"
    },
    listItemsWrapper: {
        maxWidth: "50%",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "0.5fr 8fr 0.5fr",
        alignItems: "center",
        borderBottom: "1px solid grey"
    },
    itemName: {
        textAlign: "start",
        fontSize: "18px",
        margin: "10px"
    },
    itemNumber: {
        textAlign: "start",
        fontSize: "18px",
        margin: "10px 0"
    },
}));

const CreateListPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const date = useDate()
    const {user} = useSelector((state) => state?.user)
    const {lists} = useSelector((state) => state?.lists)
    const {tempListItem} = useSelector((state) => state?.lists)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [category, setCategory] = useState(null || selectedCategory)
    const [listTitle, setListTitle] = useState('')
    const [isConfirmTitle, setIsConfirmTitle] = useState(false)
    const [isConfirmCategory, setIsConfirmCategory] = useState(false)
    const [isAddCategory, setIsAddCategory] = useState(false)
    const [isOpenListItem, setIsOpenListItem] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false);
    
    console.log("isFavorite", isFavorite)
    
    useEffect(() => {
        setCategory(selectedCategory)
    }, [selectedCategory])

    const onChangeListTitle = (e) => setListTitle(e.target.value)
    const onChangeCategory = (e) => setCategory(e.target.value)
    const onChangeSelectedCategory = (e) => setSelectedCategory(e.target.value) 
    const onClickAddNewList = () => {
        if(isConfirmTitle) {
            dispatch(addNewList({listTitle, 
                date, 
                category: category, 
                listItem: tempListItem, 
                isFavorites: isFavorite,
                userId: user?.user?.id}))
            history.push(routeNames.ROUTE_MAIN)
        }
    }
    const onClickGoBack = () => history.goBack()
    const onClickConfirmTitle = () => {
        !!listTitle && setIsConfirmTitle(!isConfirmTitle)
    }
    const onClickConfirmCategory = () => {
        !!category && setIsConfirmCategory(!isConfirmCategory)
        setIsAddCategory(!isAddCategory)
    }

    const onClickAddCategory = () => setIsAddCategory(!isAddCategory)

    const onClickIsFavoriteHandler = () => setIsFavorite(!isFavorite)

    const getCategoryList = (targetCategory) => {
        const categoryList = targetCategory?.map((list) => {
            return list.category
        })
        const catList = categoryList?.filter((item, pos) => {
            if(!!item) return categoryList.indexOf(item) == pos;
        })
        return catList
    }

    const categoryList = getCategoryList(lists)

    const openListItemHandler = () => setIsOpenListItem(true)
    const onClickConfirmItem = (itemName) => {
        setIsOpenListItem(false)
        dispatch(setTempListItem({itemName: itemName}))
    }
    

    return (
        <div className={classes.root}>
            <div className={classes.headerWrapper}>
                <ArrowBackIcon onClick={onClickGoBack} 
                    className={classes.backButton}
                    />
                <h4>Creste list page</h4>
                <div></div>
            </div>
            {!isConfirmTitle ?
                <div className={classes.inputTitleWrapper}>
                    <Input label="List title"
                    onChangeInput = {(e) => onChangeListTitle(e)}
                    defaultValue={!!listTitle ? listTitle : null}
                    />
                    <Tooltip title={"Enter list title"}
                        placement="bottom"
                        arrow={true}>
                        <CheckIcon color={!!listTitle ? "primary" : "disabled"} 
                            style={!!listTitle ? {cursor: "pointer"} : {cursor: "not-allowed"}}
                            onClick={onClickConfirmTitle}/>
                    </Tooltip>
                </div>
                :
                <div className={classes.inputTitleWrapper}> 
                    <h2 className={classes.confirmTitle}>{listTitle}</h2>
                    <Tooltip title={"Edit list title"}
                        placement="bottom-start"
                        arrow={true}>
                        <CreateIcon color="primary" 
                            onClick={onClickConfirmTitle}
                            style={{cursor: "pointer"}}
                            size="small"/>
                    </Tooltip>
                </div>   
            }
            {!isAddCategory ? 
                <Select categoryList={categoryList}
                    onChange={onChangeSelectedCategory}
                    selectedCategory={selectedCategory}
                    onClickAddCategory={onClickAddCategory}
                />
                :
                <>
                {!isConfirmCategory ?
                    <div className={classes.inputTitleWrapper}>
                        <Input label="category"
                        onChangeInput = {(e) => onChangeCategory(e)}
                        defaultValue={!!category ? category : null}
                        />
                        <Tooltip title={"Enter category"}
                            placement="bottom"
                            arrow={true}>
                            <CheckIcon color={!!category ? "primary" : "disabled"} 
                                style={!!category ? {cursor: "pointer"} : {cursor: "not-allowed"}}
                                onClick={onClickConfirmCategory}/>
                        </Tooltip>
                    </div>
                    :
                   <div className={classes.inputTitleWrapper}> 
                       <h2 className={classes.confirmTitle}>{category}</h2>
                       <Tooltip title={"Edit list category"}
                           placement="bottom-start"
                           arrow={true}>
                           <CreateIcon color="primary" 
                               onClick={onClickConfirmCategory}
                               style={{cursor: "pointer"}}
                               size="small"/>
                       </Tooltip>
                   </div>  
                }   
                </>
            }
            <CheckBox onClickCheckBox={onClickIsFavoriteHandler}/>
            <div className={classes.itemsList}>
                {!!tempListItem?.length && tempListItem?.map((listItem, index) => {
                    return (
                        <div className={classes.listItemsWrapper}>
                            <span className={classes.itemNumber}>{index + 1}.</span>
                            <span className={classes.itemName}>{listItem.itemName}</span>
                            <CreateIcon color="primary" 
                            style={{cursor: "pointer"}}
                            size="small"/>
                        </div>)
                })}
            </div>
            {isOpenListItem && <ListItem onClickConfirmItem={onClickConfirmItem}/>}
            
            <div>
                <Tooltip title="Add item"
                    placement="bottom"
                    arrow={true}>
                    <AddCircleOutlineIcon color="primary" onClick={openListItemHandler}/>
                </Tooltip>
            </div>
            <Tooltip title={!isConfirmTitle ? "Enter list title" : "Create"}
                placement="bottom"
                arrow={true}>
                <div className={classes.createListButton}
                    style={isConfirmTitle ? {cursor: "pointer"} : {cursor: "not-allowed"}}>
                    <Button buttonText="Create list"
                        isDisabled={!isConfirmTitle && true}
                        variant="contained"
                        color="primary"
                        onClickButton={onClickAddNewList}/>
                </div>
            </Tooltip>
        </div>
    )
}

export default CreateListPage