import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Categories from "../features/Categories/Categories";
import CategoriesResponse from "./CategoriesResponse";

const server = setupServer(
  rest.get("/api/categories", (req, res, ctx) => {
    return res(ctx.json(CategoriesResponse))
  })
)

test('Should return empty list when no categories provided',  () => {
    render(<Categories/>)

    expect(screen.getByText('Loading categories...')).toBeVisible()
    expect(screen.getByText('Category')).toBeVisible()
    expect(screen.getByText('Budgeted')).toBeVisible()
    expect(screen.getByText('Activity')).toBeVisible()
    expect(screen.getByText('Available')).toBeVisible()
})

test('Should display categories with subcategories', () => {
    render(<Categories categories={CategoriesResponse['hydra:member']}/>)

    expect(screen.getByText('Category 0')).toBeVisible()
    expect(screen.getByText('Category 1')).toBeVisible()
    expect(screen.getByText('Category 2')).toBeVisible()
    expect(screen.getByText('Category 3')).toBeVisible()
    expect(screen.getByText('Category 4')).toBeVisible()
})
