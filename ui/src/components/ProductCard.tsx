import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface ProductProps {
    title: string;
    description: string;
    image: string;
    price: number;
}

const ProductCard = (product: ProductProps) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.title} src={product.image} />}
    >
      <Meta title={product.title} description={product.description} />
      <p>Price: ${product.price}</p>
    </Card>
  );
};

export default ProductCard;