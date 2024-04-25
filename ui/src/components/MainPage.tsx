import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SortSelector from "./SortSelector";
import axios from "axios";
import { Product } from "../types/product-types";
import { Button } from "antd";

function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [sort, setSort] = useState("desc");
  const onSortChange = (value: string, option: any) => {
    axios
      .get(
        `http://localhost:3000/feed?page=1&pageSize=10&sort=${value}`
      )
      .then((res) => {
        setProducts(res.data);
        if (sort === "asc") {
          setSort("desc");
        } else {
          setSort("asc");
        }
        setPageNumber(1);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/feed?page=${pageNumber}&pageSize=10&sort=${sort}`
      )
      .then((res) => {
        setProducts(res.data);
        setPageNumber(pageNumber + 1);
      });
  },[]);

  function onLoadMoreClicked(event: any): void {
    axios
      .get(
        `http://localhost:3000/feed?page=${pageNumber}&pageSize=10&sort=${sort}`
      )
      .then((res) => {
        setProducts([...products, ...res.data]);
        setPageNumber(pageNumber + 1);
      });
  }

  return (
    <center>
      <SortSelector
        className="sort-selector"
        onSortChange={(value, option) => onSortChange(value, option)}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      <Button type="primary" onClick={onLoadMoreClicked}>
        Load More
      </Button>
    </center>
  );
}

export default MainPage;