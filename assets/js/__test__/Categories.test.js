import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Categories from "../features/Categories/Categories";
import CategoriesResponse from "./CategoriesResponse";
import store from '../app/store'
import { Provider } from "react-redux";

const server = setupServer(
  rest.get("/api/categories", (req, res, ctx) => {
    return res(ctx.json(CategoriesResponse))
  })
)

test('Should return empty list when no categories provided',  () => {
    render(<Provider store={store}><Categories /></Provider>)

    expect(screen.getByText('Category')).toBeVisible()
    expect(screen.getByText('Budgeted')).toBeVisible()
    expect(screen.getByText('Activity')).toBeVisible()
    expect(screen.getByText('Available')).toBeVisible()
})

// TODO: Redux tests
/*
test('Should display categories with subcategories', () => {
    render(<Provider store={store}><Categories categories={CategoriesResponse['hydra:member']}/></Provider>)

    expect(screen.getByText('Category 0')).toBeVisible()
    expect(screen.getByText('Category 1')).toBeVisible()
    expect(screen.getByText('Category 2')).toBeVisible()
    expect(screen.getByText('Category 3')).toBeVisible()
    expect(screen.getByText('Category 4')).toBeVisible()
})

*/
