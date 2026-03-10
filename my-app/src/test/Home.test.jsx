import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from '../Components/Home'
import { BrowserRouter } from 'react-router-dom'

// Mock the components that use useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    }
})

describe('Home Component', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        expect(container).toBeDefined()
    })
})
