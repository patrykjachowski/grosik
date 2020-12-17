import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { selectCategories, addCategories } from './categoriesSlice'
import CONFIG from '../config'
import CategoriesList from './CategoriesList'

export default () => {
    const categories = useSelector(selectCategories)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (categories.length) return

        const fetchData = async () => {
            const payload = await axios(CONFIG.endpoint.categories)
            dispatch(addCategories(payload.data['hydra:member']))
        }
        fetchData()
    }, [])

    return <CategoriesList categories={categories} />
}
