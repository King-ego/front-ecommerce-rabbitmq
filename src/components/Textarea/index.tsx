import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {TextareaHTMLAttributes} from "react";

type InputProps = {
	label: string;
	placeholder?: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
	testId?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(data: InputProps) {
	const {
		register,
		error,
		placeholder,
		label,
		testId,
		...rest
	} = data;
	return(
		<div className={"w-full"}>
			<label className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<textarea
				{...register}
				placeholder={placeholder}
				rows={4}
				data-testid={testId}
				className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
				{...rest}
			/>
			{error && (
				<p className="text-red-500 text-sm mt-1">{error.message}</p>
			)}
		</div>
	)
}
