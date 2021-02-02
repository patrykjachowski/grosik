import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, selectCategories } from './categoriesSlice'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ErrorPopup from '../../components/ErrorPopup'
import CategoriesTable from './components/CategoriesTable'
import CategoriesTableLegend from './components/CategoriesTableLegend'

export default function Categories() {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()

  const renderCategoriesTables = () => {
    return !categories ? (
      <CategoriesTable category={null} />
    ) : (
      categories.map((category) => (
        <CategoriesTable key={category.id} category={category} />
      ))
    )
  }

  return (
    <div style={{ position: 'relative', paddingBottom: '100px' }}>
      <CategoriesTableLegend />
      {renderCategoriesTables()}
      <br />
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'absolute', right: '10px', bottom: '10px' }}
        onClick={() => dispatch(createCategory())}
      >
        <AddIcon />
      </Fab>
      <ErrorPopup />
    </div>
  )
}
