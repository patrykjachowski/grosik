import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { selectTransactions } from './transactionsSlice'
import SubcategoryCell from '../../components/SubcategoryCell'
import TransactionsTextCell from './TransactionsTextCell'
import TransactionsDateCell from './TransactionsDateCell'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

const Transactions = () => {
  const { transactions } = useSelector(selectTransactions)

  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected] = React.useState([])
  const [dense] = React.useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Paper>
      <TableContainer>
        <Table
          // className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            // rowCount={rows.length}
          />
          <TableBody>
            {!transactions.length ? (
              <TableRow>
                <TableCell>Transactions list is empty</TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction, index) => {
                const subcategory = transaction.subcategory
                  ? transaction.subcategory['@id']
                  : null
                const transactionFormatted = {
                  ...transaction,
                  bank: transaction.bank['@id'],
                  subcategory,
                }

                return (
                  <TableRow hover key={index}>
                    <TableCell> {transaction.bank.name} </TableCell>
                    <SubcategoryCell transaction={transaction} />
                    <TransactionsDateCell transaction={transactionFormatted} />
                    <TransactionsTextCell
                      transaction={transactionFormatted}
                      valueName="value"
                      value={transaction.value}
                    />
                    <TransactionsTextCell
                      transaction={transactionFormatted}
                      valueName="payee"
                      value={transaction.payee}
                    />
                    <TransactionsTextCell
                      transaction={transactionFormatted}
                      valueName="memo"
                      value={transaction.memo}
                    />
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Transactions

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Bank' },
  {
    id: 'subcategory',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Value' },
  { id: 'payee', numeric: true, disablePadding: false, label: 'Payee' },
  { id: 'memo', numeric: true, disablePadding: false, label: 'Memo' },
]

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props

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
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  numSelected: PropTypes.number,
  rowCount: PropTypes.number,
  onRequestSort: PropTypes.func,
}
