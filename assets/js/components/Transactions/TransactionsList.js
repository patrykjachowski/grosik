import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Checkbox from "@material-ui/core/Checkbox"
import TableHead from "@material-ui/core/TableHead"
import TableSortLabel from "@material-ui/core/TableSortLabel"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}))

export default ({ transactions }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  /*
                  const handleSelectAllClick = (event) => {
                      if (event.target.checked) {
                          const newSelecteds = rows.map((n) => n.name);
                          setSelected(newSelecteds);
                          return;
                      }
                      setSelected([]);
                  };
        
              */
  return (
    <div>
      <TableContainer>
        <Table
          // className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            // onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            // rowCount={rows.length}
          />
          <TableBody>
            {!transactions ? (
              <TableRow>
                <TableCell>Transactions list is empty</TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow hover key={transaction.id}>
                  <TableCell> {transaction.bank.name} </TableCell>
                  <TableCell>{transaction.subcategory ? transaction.subcategory.name : 'uncategorised' }</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.value}</TableCell>
                  <TableCell>{transaction.payee}</TableCell>
                  <TableCell>{transaction.memo}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Bank" },
  {
    id: "subcategory",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  { id: "value", numeric: true, disablePadding: false, label: "Value" },
  { id: "payee", numeric: true, disablePadding: false, label: "Payee" },
  { id: "memo", numeric: true, disablePadding: false, label: "Memo" },
]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {/*<TableCell padding="checkbox">*/}
        {/*  <Checkbox*/}
        {/*    indeterminate={numSelected > 0 && numSelected < rowCount}*/}
        {/*    checked={rowCount > 0 && numSelected === rowCount}*/}
        {/*    onChange={onSelectAllClick}*/}
        {/*    inputProps={{ "aria-label": "select all desserts" }}*/}
        {/*  />*/}
        {/*</TableCell>*/}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const renderTransactionCells = (transactions) => {
  return transactions.map((transaction) => (
    <React.Fragment>
      <TableCell>
        {/*
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
*/}
        {transaction.bank}
      </TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>{transaction.value}</TableCell>
      <TableCell>{transaction.payee}</TableCell>
      {/*<TableCell >*/}
      {/*  { transaction.memo }*/}
      {/*</TableCell>*/}
    </React.Fragment>
  ))
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
}

