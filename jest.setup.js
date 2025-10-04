import '@testing-library/jest-dom'

// Mock global para next/navigation
jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '/',
			query: '',
			asPath: '/',
			push: jest.fn(),
			pop: jest.fn(),
			reload: jest.fn(),
			back: jest.fn(),
			prefetch: jest.fn(),
			beforePopState: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
				emit: jest.fn(),
			},
		}
	},
	useSearchParams() {
		return new URLSearchParams()
	},
}))
