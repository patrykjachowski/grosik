import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row({ row }) {
  const [open, setOpen] = React.useState(true)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
          <TableCell style={{'marginRight':'30px'}}>
              <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {!open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.budgeted || 0}</TableCell>
        <TableCell>{row.activity || 0}</TableCell>
        <TableCell>{row.available || 0}</TableCell>
      </TableRow>
      <TableRow >
                <TableCell style={{ padding: 0}} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table aria-label="purchases" style={{'tableLayout':'fixed'}}>
                                <TableBody>
                                    {row.subcategories.map((subcategory) => (
                                        <TableRow key={subcategory["@id"]}>
                                            <TableCell style={{'width': '55px'}}/>
                                            <TableCell>{subcategory.name}</TableCell>
                                            <TableCell>{subcategory.budgeted || 0}</TableCell>
                                            <TableCell>{subcategory.activity || 0}</TableCell>
                                            <TableCell>{subcategory.available || 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
    </React.Fragment>
  )
}

export default function CategoriesList({categories}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" style={{'tableLayout':'fixed'}}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{'width':'60px'}}/>
                        <TableCell>Category</TableCell>
                        <TableCell>Budgeted</TableCell>
                        <TableCell>Activity</TableCell>
                        <TableCell>Available</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!categories ? (
                        <TableRow>
                            <TableCell>Loading categories...</TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                        <Row key={category.name} row={category} />
                    )))
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
}

/*
===================================================
===================================================
===================================================
*/

/*
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
*/

// export default function CategoriesList({categories}) {
//   return !categories ? 'Loading categories...' : <BasicTable />
// }

/*
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

export default function CategoriesList({ categories }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Budgeted</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!categories ? (
            <TableRow>
              <TableCell>Loading categories...</TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.name}>
                <RowContent
                  name={category.name}
                  budgeted={0}
                  activity={0}
                  available={0}
                />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const RowContent = ({ name, budgeted, activity, available }) => {
  return (
    <>
      <TableCell>{name}</TableCell>
      <TableCell>{budgeted}</TableCell>
      <TableCell>{activity}</TableCell>
      <TableCell>{available}</TableCell>
    </>
  )
}
*/

