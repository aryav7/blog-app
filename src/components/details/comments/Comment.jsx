import { Box, Typography , styled} from '@mui/material'
import { Delete } from '@mui/icons-material'
import React from 'react'
import { useContext } from 'react'
import { API } from '../../../service/api'
import { DataContext } from '../../../context/DataProvider'

const Component = styled(Box)`
margin-top : 30px;
background : #F5F5F5;
padding : 10px;
`
const Container = styled(Box)`
display:flex;
margin-botton : 5px;
`
const Name = styled(Typography)`
 font-weight:600;
 font-size:18px;
 margin-right:20px;
`

const StyleDate = styled(Typography)`
color : #878787;
font-size:14px;
`

const DeleteIcon = styled(Delete)`
margin-left:auto;
`

const Comment = ({comment, setToggle}) => {

    const {account} = useContext(DataContext);

    const removeComment = async () =>{
      let response = await API.deleteComment(comment._id);
      setToggle(prevState => !prevState);
    }
    

  return (
    <Component>
        <Container>
            <Name>{comment.name}</Name>
            <StyleDate>{new Date(comment.date).toDateString()}</StyleDate>
            {comment.name === account.username && <DeleteIcon onClick={()=> removeComment()}/>}
        </Container>

            <Typography>{comment.comments}</Typography>
    </Component>
  )
}

export default Comment
