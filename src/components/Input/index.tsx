import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {InputHTMLAttributes} from "react";

type InputProps = {
	label: string;
	type?: string;
	step?: string | number;
	placeholder?: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
	testId?: string;
};

export function Input(data: InputProps) {
	const {
		label,
		type = "text",
		placeholder,
		error,
		step,
		register,
		testId
	} = data;
	return (
		<div className="w-full">
			<label className="block text-sm font-medium text-gray-700">{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				step={step}
				{...register}
				data-testid={testId}
				className={`text-gray-500 w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-500" : "border-gray-300"}
        `}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
}
