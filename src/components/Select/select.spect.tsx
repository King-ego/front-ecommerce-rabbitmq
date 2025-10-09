import Select from "./index";
import {render, screen, fireEvent} from "@testing-library/react";
import {useForm} from "react-hook-form";

type FormValues = {
	testSelect: string;
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
			<Select
				label={"Test Select"}
				placeholder="Select an option"
				options={[
					{value: 'option1', label: 'Option 1'},
					{value: 'option2', label: 'Option 2'}
				]}
				register={register("testSelect", {required: "This field is required"})}
				error={errors.testSelect}
				testId="test-select"
			/>
			<button type="submit" data-testid="test-button">Submit</button>
		</form>
	);
}

describe("Select Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})

	it('should render select success with label', async () => {
		render(<TestWrapper/>)
		expect(screen.getByTestId("test-select")).toBeInTheDocument();
	});

	it('should render placeholder', async () => {
		render(<TestWrapper/>)
		expect(screen.getByText("Select an option")).toBeInTheDocument();
	});
});
