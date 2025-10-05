import {Input} from "@/components/Input/index";
import {render, screen, fireEvent} from "@testing-library/react";
import {useForm} from "react-hook-form";

type FormValues = {
	testInput: string;
};

function TestWrapper() {
	const {
		register,
		formState: {errors},
		handleSubmit
	} = useForm<FormValues>();

	const onSubmit = () => {}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				label={"Test Input"}
				register={register("testInput", {required: "This field is required"})}
				error={errors.testInput}
				testId="test-input"
				placeholder="Enter test input"
			/>
			<button type="submit" data-testid="test-button">Submit</button>
		</form>
	);
}

describe("Input Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})

	it('should render input success with label', async () => {
		render(<TestWrapper />)
		expect(screen.getByTestId("test-input")).toBeInTheDocument();

	});

	it('should render placeholder', async () => {
		render(<TestWrapper />)
		expect(screen.getByPlaceholderText("Enter test input")).toBeInTheDocument();
	});

	it('should accept user input', async () => {
		render(<TestWrapper/>);

		const input = screen.getByTestId("test-input");

		fireEvent.change(input, { target: { value: 'texto teste' } });

		expect(input).toHaveValue('texto teste');

	});

	it('should display error message when fails', async () => {
		render(<TestWrapper />);

		const submitButton = screen.getByTestId("test-button");

		fireEvent.click(submitButton);

		expect(await screen.findByText("This field is required")).toBeInTheDocument();
	});
})
