import ChallengePage from "@/app/challenge/ChallengePage";
import {render, screen, fireEvent} from "@testing-library/react";

describe("ChallengePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})

	it('should render ChallengePage component', async () => {
		render(<ChallengePage />)
		expect(screen.getByText("Challenge Page")).toBeInTheDocument();

	});

	it('should submit challenge', () => {
		render(<ChallengePage />)

		fireEvent.change(screen.getByTestId("challenge_input_one"), {
			target: { value: 'First Answer' }
		})

		fireEvent.change(screen.getByTestId("challenge_input_two"), {
			target: { value: 'Second Answer' }
		})

		fireEvent.change(screen.getByTestId("challenge_input_three"), {
			target: { value: 'Third Answer' }
		})

		fireEvent.click(screen.getByTestId("challenge_submit_button"))
	});
});
