import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChangeIsFavoriteModal from "./changeIsFavoriteModal/ChangeIsFavoriteModal"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    '& .MuiCardHeader-title': {
      fontWeight: 800,
      fontSize: "16px",
      textTransform: "uppercase"
    }, 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  category: {
    fontSize: "12px",
    backgroundColor: "#ebebeb",
    color: "#000",
    padding: "3px 5px",
    marginRight: "5px",
    borderRadius: "10px"
  },
  listItemsWrapper: {
      maxWidth: "90%",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "0.5fr auto",
      alignItems: "center",
      fontSize: "18px"
  },
  itemNumber: {
    textAlign: "end",
    color: "#f44336",
  },
  itemName: {
    textAlign: "start",
    marginLeft: "10px",
  },
  isFavoriteActiveColor: {
    color: "#f44336",
    marginTop: "-5px"
},
isFavoriteUnActiveColor: {
    color: "rgba(0, 0, 0, 0.54)",
    marginTop: "-5px"
}
}));

const ListCard = ({listData}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isOpenChangeIsFavoriteModal, setIsOpenChangeIsFavoriteModal] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded)
  const onClickOpenChangeIsFavoriteModal = () => setIsOpenChangeIsFavoriteModal(true)
  const onClickCloseChangeIsFavoriteModal = () => setIsOpenChangeIsFavoriteModal(false)

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {listData.listTitle.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={listData.listTitle}
          subheader={listData.date}
        />
        <div>
          <span className={classes.category}>category</span>
          <span>{listData?.category ? listData?.category : "no category"}</span>
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon className={listData.isFavorites ? classes.isFavoriteActiveColor : classes.isFavoriteUnActiveColor}
              onClick={onClickOpenChangeIsFavoriteModal}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> 
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {listData.listItem.map((item, index) => {
              return (
                <div className={classes.listItemsWrapper} key={item.itemName}>
                  <span className={classes.itemNumber}>{index + 1}.</span>
                  <span className={classes.itemName}>{item.itemName}</span>
                </div>
              )
            })}
            
          </CardContent>
        </Collapse>
        
      </Card>
      <ChangeIsFavoriteModal open={isOpenChangeIsFavoriteModal} 
        onClickClose={onClickCloseChangeIsFavoriteModal}
        listData={listData}
      />
    </>
  );
}

export default ListCard