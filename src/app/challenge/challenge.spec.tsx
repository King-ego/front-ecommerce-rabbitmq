import ChallengePage from "@/app/challenge/ChallengePage";
import {render, screen} from "@testing-library/react";

describe("ChallengePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})

	it('should render ChallengePage component', async () => {
		render(<ChallengePage />)
		expect(screen.getByText("Challenge Page")).toBeInTheDocument();
	});
});
