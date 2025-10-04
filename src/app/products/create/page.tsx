"use client";

import {useForm} from "react-hook-form";
import {Input} from "@/components/Input";
import Select from "@/components/Select";
import {ProductHttpService} from "@/requests/http/services/ProductHttpService";

type FormValues = {
	name: string;
	price: number;
	quantity_in_stock: number;
	category: string;
	description: string;
};

export default function CadastroProduto() {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm<FormValues>();

	const onSubmit = async (data: FormValues) => {
		try {
			await ProductHttpService.createProduct(data);
			console.log("Produto cadastrado:", data);
			reset();
		} catch (error) {
			console.error("Erro ao cadastrar produto:", error);
		}
	};

	/*const onSubmit = async (data: FormValues) => {
		console.log("Produto cadastrado:", data);
		await ProductHttpService.createProduct({
			price: 12,
			description: "descricao",
			name: "nome",
			quantity_in_stock: 1,
			category: "eletronicos"
		})
		reset();

	};*/

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-md">
				<div className="flex flex-col items-center mb-6">
					<div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-8 h-8 text-gray-700"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
								  d="M20.25 7.5l-8.954-4.477a1.125 1.125 0 00-1.042 0L1.5 7.5m18.75 0v9a1.125 1.125 0 01-.625 1.01l-7.5 3.75a1.125 1.125 0 01-1 0l-7.5-3.75A1.125 1.125 0 013 16.5v-9m18.75 0L12 12m0 0L3.75 7.5M12 12v9"/>
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-gray-800">Cadastro de Produto</h2>
					<p className="text-gray-500 text-sm text-center">
						Preencha os campos abaixo para cadastrar um novo produto
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					<Input label={"Nome do Produto"}
						   register={{...register("name", {required: "Informe o nome do produto"})}}
						   placeholder={"Digite o nome do produto"} error={errors.name}/>

					<div className="grid grid-cols-2 gap-4">

						<Input label={"Preço (R$)"} register={{...register("price", {required: "Informe o preço"})}}
							   step={"0.01"} type={"number"} error={errors.price}/>

						<Input label={"Quantidade em Estoque"}
							   register={{...register("quantity_in_stock", {required: "Informe a quantidade"})}}
							   type={"number"} error={errors.quantity_in_stock}/>

					</div>

					{/* Categoria */}

					<Select label="Categoria"
							register={{...register("category", {required: "Selecione uma categoria"})}}
							placeholder="Selecione a categoria" error={errors.category}
							options={[{value: "eletronicos", label: "Eletrônicos"}, {value: "roupas", label: "Roupas"}, {value: "moveis", label: "Móveis"}]}
					/>
					{/* Descrição */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Descrição
						</label>
						<textarea
							{...register("description", {required: "Descreva o produto"})}
							placeholder="Descreva o produto detalhadamente..."
							rows={4}
							className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
						/>
						{errors.description && (
							<p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
						)}
					</div>

					{/* Botões */}
					<div className="flex justify-between pt-4">
						<button
							type="button"
							onClick={() => reset()}
							className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
						>
							Limpar
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800"
						>
							Cadastrar Produto
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
