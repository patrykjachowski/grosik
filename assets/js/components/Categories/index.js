import React, { useState, useEffect } from "react"
import axios from "axios"

import CONFIG from "../config"
import CategoriesList from "./CategoriesList"

export default () => {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const payload = await axios(CONFIG.endpoint.categories)
      setCategories(payload.data["hydra:member"])
    }
    fetchData()
  }, [])

  return <CategoriesList categories={categories} />
}
