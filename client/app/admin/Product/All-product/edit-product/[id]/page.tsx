export default function EditProduct({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Product</h1>
      <p className="text-white">Hello World - Edit Product ID: {params.id}</p>
    </div>
  );
} 