import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import React from 'react'
import { categories } from '../../constants/data'
import { Link, useSearchParams } from 'react-router-dom'

const StyleTable = styled(Table)` 
 border: 1px solid rgba(224,224,224,1);
`
const StyleButton = styled(Button)`
margin: 20px;
width:85%;
background: #6495ED;
color:white;
`

const StyledLink = styled(Link)`
text-decoration : none;
color:inherit;
`

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category =  searchParams.get('category');
  return (
    <>
    <StyledLink to={`/create?category=${category || ''}`}>
    <StyleButton variant='contained'>Create blog</StyleButton>
    </StyledLink>

    <StyleTable>
        <TableHead>
            <TableRow>
                <TableCell>
                    <Link to= '/'>
                    All Categories
                    </Link>
                    </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                categories.map(category=>(
                    <TableRow key={category.id}>
                        <TableCell>
                            <StyledLink to={`/?category=${category.type}` }>
                            {category.type}
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </StyleTable>
    </>
  )
}

export default Categories
