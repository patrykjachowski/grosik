import React, { useEffect } from 'react'
import axios from 'axios'

import CONFIG from '../config'
import CategoriesList from './CategoriesList'

export default ({ categories, onSetCategories }) => {
  useEffect(() => {
    if (categories) return
    const fetchData = async () => {
      const payload = await axios(CONFIG.endpoint.categories)
      onSetCategories(payload.data['hydra:member'])
    }
    fetchData()
  }, [])

  return categories && <CategoriesList categories={categories} />
}
