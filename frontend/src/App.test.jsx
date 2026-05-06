import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('📝 Todo App')).toBeDefined()
  })

  it('has input and add button', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeDefined()
    expect(screen.getByText('Add')).toBeDefined()
  })
})
