export default function ViewProduct({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-4">View Product</h1>
      <p className="text-white">Hello World - View Product ID: {params.id}</p>
    </div>
  );
}
 