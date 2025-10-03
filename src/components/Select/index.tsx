import {FieldError, UseFormRegisterReturn} from "react-hook-form";

type InputProps = {
	label: string;
	placeholder?: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
};

export default function Select(data: InputProps) {
	const {
		register,
		error,
		placeholder,
		label
	} = data;
	return(
		<div className={"w-full"}>
			<label className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<select
				{...register}
				className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
			>
				<option value="" disabled>{placeholder}</option>
				<option value="eletronicos">Eletrônicos</option>
				<option value="roupas">Roupas</option>
				<option value="moveis">Móveis</option>
			</select>
			{error && (
				<p className="text-red-500 text-sm mt-1">{error.message}</p>
			)}
		</div>
	)
}
