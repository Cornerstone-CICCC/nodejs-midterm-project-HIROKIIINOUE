import { useEffect, useState } from "react";
import type { ShoppingItemType } from "../types/shoppingItem.types";

export const useShoppingItem = () => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItemType[]>([]);

  useEffect(() => {
    const getAllShoppingItems = async () => {
      try {
        const res = await fetch("http://localhost:3000/item");
        const data = await res.json();
        if (!res.ok) {
          setShoppingItems([]);
          return;
        }
        setShoppingItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllShoppingItems();
  }, []);

  return {
    shoppingItems,
  };
};
