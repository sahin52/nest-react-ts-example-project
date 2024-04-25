import React from "react";
import { Button, Card } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import axios from "axios";
import { Product } from "../types/product-types";

const { Meta } = Card;

interface ProductComponentProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  onPinClicked: any;
  isPinned: boolean;
}

const ProductCard = (props: ProductComponentProps) => {

  return (
    <Card
      hoverable
      style={{ width: 240, height: 400, overflow: "hidden" }}
      cover={
        <img
          height={"240"}
          width="100%"
          alt={props.title}
          src={props.image}
        />
      }
    >
      <Meta title={props.title} description={props.description} />
      <p>Price: ${props.price}</p>
      <Button
        type= { props.isPinned?"default":"primary"}
        icon={<PushpinOutlined />}
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={(event) => {
          props.onPinClicked(event, props);
        }}
      >
        Pin
      </Button>
    </Card>
  );
};

export default ProductCard;
