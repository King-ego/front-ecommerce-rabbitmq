'use server';

export default async function Home() {
    const products = await fetch('http://localhost:8079/products')
    console.log({products: products.json()})

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div>
            <>{JSON.stringify(products, null, 2) }</>
        </div>
    </div>
  );
}
