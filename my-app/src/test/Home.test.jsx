import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from '../Components/Home'

// Mock child components to avoid asset imports and framer-motion issues in jsdom
vi.mock('../Components/Hero', () => ({
    default: () => <div data-testid="hero">Hero</div>
}))

vi.mock('../Components/Features', () => ({
    default: () => <div data-testid="features">Features</div>
}))

vi.mock('../Components/CallToAction', () => ({
    default: () => <div data-testid="cta">CallToAction</div>
}))

describe('Home Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Home />)
        expect(container).toBeDefined()
    })

    it('renders all child sections', () => {
        const { getByTestId } = render(<Home />)
        expect(getByTestId('hero')).toBeDefined()
        expect(getByTestId('features')).toBeDefined()
        expect(getByTestId('cta')).toBeDefined()
    })
})
