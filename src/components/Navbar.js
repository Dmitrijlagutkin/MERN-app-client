import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import { NavLink } from "react-router-dom"
import CloseIcon from "@material-ui/icons/Close"
import AppBar from "./Appbar"

const useStyles = makeStyles({
    list: {
        width: 250,
        padding: "0 15px ",
    },
    menuIcon: {
        padding: "15px",
    },
    closeButton: {
        textAlign: "end",
        padding: "15px 15px 15px 0",
        cursor: "pointer",
    },
})

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles()
    const [state, setState] = useState({
        left: false,
    })
    const [anchor, setAnchor] = useState("left")
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const list = (anchor) => (
        <div>
            <div className={classes.closeButton} onClick={toggleDrawer}>
                <CloseIcon color='primary' />
            </div>

            <List className={classes.list}>
                {["auth", "lists", "Send email", "Drafts"].map((text) => (
                    <NavLink to={text} button key={text}>
                        <ListItemText primary={text} onClick={toggleDrawer} />
                    </NavLink>
                ))}
            </List>
            <Divider />
        </div>
    )

    return (
        <div>
            <React.Fragment>
                <AppBar onClickOpenMenu={toggleDrawer} />
                <SwipeableDrawer
                    anchor={anchor}
                    open={open}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}>
                    {list(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    )
}
