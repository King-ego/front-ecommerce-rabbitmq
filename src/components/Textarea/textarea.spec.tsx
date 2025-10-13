import Textarea from './index';

import {render, screen} from "@testing-library/react";
import {useForm} from "react-hook-form";

type FormValues = {
	testTextarea: string;
};

function TestWrapper() {
	const {
		register,
		formState: {errors},
		handleSubmit
	} = useForm<FormValues>();

	const onSubmit = () => {
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Textarea
				label={"Test Textarea"}
				placeholder="Enter test textarea"
				register={register("testTextarea", {required: "This field is required"})}
				error={errors.testTextarea}
				testId="test-textarea"
			/>
			<button type="submit" data-testid="test-button">Submit</button>
		</form>
	);
}

describe("Textarea Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})

	it('should render textarea success with label', async () => {
		render(<TestWrapper/>)
		expect(screen.getByTestId("test-textarea")).toBeInTheDocument();
	});
});
