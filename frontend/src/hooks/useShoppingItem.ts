import { useEffect, useState } from "react";
import type { ShoppingItemType } from "../types/shoppingItem.types";

export const useShoppingItem = (currentMenu = "") => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItemType[]>([]);
  const [filteredShoppingItems, setFilteredShoppingItems] = useState<
    ShoppingItemType[]
  >([]);

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
        setFilteredShoppingItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllShoppingItems();

    if (currentMenu !== "") {
      const filterByMenu = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/item/filtered?menu=${currentMenu}`,
          );
          const data = await res.json();
          if (!res.ok) {
            alert(data.error);
            return;
          }
          setFilteredShoppingItems(data);
        } catch (error) {
          console.error(error);
        }
      };
      filterByMenu();
    }
  }, [currentMenu]);

  return {
    shoppingItems,
    filteredShoppingItems,
  };
};
