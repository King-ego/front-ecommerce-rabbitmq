import {Input} from "@/components/Input/index";
import {render, screen} from "@testing-library/react";
import {useForm} from "react-hook-form";

type FormValues = {
	testInput: string;
};

function TestWrapper() {
	const {
		register,
		formState: {errors},
	} = useForm<FormValues>();

	return (
		<form>
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

	it('should render input success', async () => {
		render(<TestWrapper />)
		expect(screen.getByTestId("test-input")).toBeInTheDocument();

	});
})
