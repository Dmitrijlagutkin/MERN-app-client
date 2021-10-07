import {useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        alignItems: "center"
    },
    iconActiveColor: {
        color: "#f44336",
        marginTop: "-5px"
    },
    iconUnActiveColor: {
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "-5px"
    }
}));

export default function CheckBox({onClickCheckBox}) {
    const classes = useStyles()
  

//   const handleChange = (event) => {
//     setIsFavorite(event.target.checked);
//   };
 

  return (
    <div className={classes.root}>
        <Checkbox 
            onClick={onClickCheckBox}
            icon={<Favorite className={classes.iconUnActiveColor} />} 
            checkedIcon={<Favorite className={classes.iconActiveColor} />} 
        />
        <span>Mark as favorites</span>
    </div>
  );
}