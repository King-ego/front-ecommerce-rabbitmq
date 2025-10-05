'use server';

import Image from "next/image";
import Link from "next/link";
import { ProductHttpService } from "@/requests/http/services/ProductHttpService";

export default async function Home() {
	const products = await ProductHttpService.getProducts();

	return (
		/*<section className="w-full">
			<div className="flex flex-wrap p-8 gap-4">
				{products?.map((product) =>
					<div key={product.id}>
						<Image src={`https://dummyimage.com/600x400/cccccc/000000&text=`} alt={`Product`} width={300}
							   height={200} priority/>
						<Link href={`/product/${product.slug}`}>{product.name}</Link>
						<p>{product.description}</p>
						<p>{Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(product.price)}</p>
					</div>
				)}
			</div>

			{/!*<div>
                <Image src='https://dummyimage.com/600x400/cccccc/000000&text=' alt={""} width={300} height={300} />
                <>{JSON.stringify(products, null, 2) }</>
            </div>*!/}
		</section>*/
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Produtos Cadastrados</h1>
				<p className="text-gray-600">Gerencie todos os produtos do seu catálogo</p>
			</div>

			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

					<div className="flex-1">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
									 viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</div>
							<input
								type="text"
								placeholder="Pesquisar produtos por nome, categoria..."
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
					</div>

					<button
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-2">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>

					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

				<div
					className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200">

					<div className="h-48 bg-gray-200 relative">
						<img
							src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
							alt="Produto"
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-3 right-3">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Em estoque
                        </span>
						</div>
					</div>

					<div className="p-4">
						<div className="mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Eletrônicos
                        </span>
						</div>

						<h3 className="font-semibold text-gray-800 mb-1 text-lg">Smartphone Premium</h3>

						<p className="text-xs text-gray-500 mb-3">smartphone-premium-2024</p>

						<p className="text-gray-600 text-sm mb-4 line-clamp-2">
							Smartphone de última geração com câmera tripla, 256GB de armazenamento e tela OLED de 6.7
							polegadas.
						</p>
						<div className="flex justify-between items-center mb-3">
							<div>
								<span className="text-2xl font-bold text-gray-900">R$ 2.499</span>
								<span className="text-sm text-gray-500">,99</span>
							</div>
							<div className="text-sm text-gray-600">
								<span className="font-medium">42</span> em estoque
							</div>
						</div>

						<div className="flex gap-2">
							<button
								className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
								Editar
							</button>
							<button
								className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
								Excluir
							</button>
						</div>
					</div>
				</div>

				<div
					className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200">
					<div className="h-48 bg-gray-200 relative">
						<img
							src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
							alt="Produto"
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-3 right-3">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                            Sem estoque
                        </span>
						</div>
					</div>

					<div className="p-4">
						<div className="mb-2">
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                            Casa & Cozinha
                        </span>
						</div>

						<h3 className="font-semibold text-gray-800 mb-1 text-lg">Cafeteira Elétrica</h3>
						<p className="text-xs text-gray-500 mb-3">cafeteira-eletrica-premium</p>

						<p className="text-gray-600 text-sm mb-4 line-clamp-2">
							Cafeteira automática com programação digital e jarra térmica de 1.5L.
						</p>

						<div className="flex justify-between items-center mb-3">
							<div>
								<span className="text-2xl font-bold text-gray-900">R$ 389</span>
								<span className="text-sm text-gray-500">,90</span>
							</div>
							<div className="text-sm text-red-600">
								<span className="font-medium">0</span> em estoque
							</div>
						</div>

						<div className="flex gap-2">
							<button
								className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
								Editar
							</button>
							<button
								className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
								Excluir
							</button>
						</div>
					</div>
				</div>

				<div
					className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200">
					<div className="h-48 bg-gray-200 relative">
						<img
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
							alt="Produto"
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-3 right-3">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Em estoque
                        </span>
						</div>
					</div>

					<div className="p-4">
						<div className="mb-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                            Áudio
                        </span>
						</div>

						<h3 className="font-semibold text-gray-800 mb-1 text-lg">Fone Bluetooth</h3>
						<p className="text-xs text-gray-500 mb-3">fone-bluetooth-noise-canceling</p>

						<p className="text-gray-600 text-sm mb-4 line-clamp-2">
							Fone de ouvido com cancelamento de ruído ativo e bateria de 30 horas.
						</p>

						<div className="flex justify-between items-center mb-3">
							<div>
								<span className="text-2xl font-bold text-gray-900">R$ 899</span>
								<span className="text-sm text-gray-500">,00</span>
							</div>
							<div className="text-sm text-gray-600">
								<span className="font-medium">15</span> em estoque
							</div>
						</div>

						<div className="flex gap-2">
							<button
								className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
								Editar
							</button>
							<button
								className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
								Excluir
							</button>
						</div>
					</div>
				</div>

				{/*<div
					className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 transition duration-200 flex items-center justify-center min-h-[400px]">
					<button className="text-center p-6 group">
						<div
							className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition duration-200">
							<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor"
								 viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M12 4v16m8-8H4"></path>
							</svg>
						</div>
						<h3 className="font-semibold text-gray-700 mb-1">Cadastrar Produto</h3>
						<p className="text-sm text-gray-500">Adicione um novo produto ao catálogo</p>
					</button>
				</div>*/}
			</div>
		</div>
	);
}
