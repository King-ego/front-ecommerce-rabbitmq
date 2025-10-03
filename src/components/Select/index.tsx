export default function Select() {
	return(
		<div className={"w-full"}>
			<label className="block text-sm font-medium text-gray-700">
				Categoria
			</label>
			<select
				{...register("category", { required: "Selecione uma categoria" })}
				className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
			>
				<option value="" disabled>Selecione uma categoria</option>
				<option value="eletronicos">Eletrônicos</option>
				<option value="roupas">Roupas</option>
				<option value="moveis">Móveis</option>
			</select>
			{errors.category && (
				<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
			)}
		</div>
	)
}
