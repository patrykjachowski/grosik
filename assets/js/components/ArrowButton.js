import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const ArrowButton = ({ collapsed = false, onToggleCollapse }) => {
  return (
    <IconButton
      aria-label="expand category"
      size="small"
      onClick={onToggleCollapse}
    >
      {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  )
}

ArrowButton.propTypes = {
  collapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
}

export default ArrowButton
