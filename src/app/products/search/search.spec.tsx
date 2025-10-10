import { render } from '@testing-library/react';
import SearchPage from "./page";

describe('Search Page', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render search page', async () => {
		const { findByText } = render(<SearchPage />);
		expect(await findByText("Resultados para: test")).toBeInTheDocument();
	});
})
