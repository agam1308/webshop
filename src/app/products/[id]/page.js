import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  // Fallback data for static deployment
  const products = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];
  return products;
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
