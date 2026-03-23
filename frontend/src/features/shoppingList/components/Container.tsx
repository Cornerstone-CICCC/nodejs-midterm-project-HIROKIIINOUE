import React, { useEffect, useState } from 'react'
import { FunctionButtons } from './FunctionButtons'
import { ShoppingList } from './ShoppingList'
import type { ShoppingItemType } from '../../../types/shoppingItem.types'
import { InputModal } from '../../../components'
import { useShoppingItem } from '../../../hooks/useShoppingItem'

export const Container = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const { shoppingItems, filteredShoppingItems } = useShoppingItem(selectedMenu)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [updatingItem, setUpdatingItem] = useState<ShoppingItemType | undefined>(undefined)
  const [shoppingList, setShoppingList] = useState<ShoppingItemType[]>([])

  useEffect(() => {
    setShoppingList(filteredShoppingItems)
  }, [filteredShoppingItems])

  const openUpdateModal = (isOpen: boolean, targetItem: ShoppingItemType) => {
    setIsUpdateModalOpen(isOpen);
    setUpdatingItem(targetItem)
  }

  return (
    <main>
      <FunctionButtons shoppingItems={shoppingItems} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setIsAddModalOpen={setIsAddModalOpen} />
      <ShoppingList shoppingItems={shoppingList} selectedMenu={selectedMenu} openUpdateModal={openUpdateModal} setShoppingList={setShoppingList} />

      {isAddModalOpen && <InputModal crud="add" onClose={setIsAddModalOpen} shoppingList={shoppingList} setShoppingList={setShoppingList} />}
      {isUpdateModalOpen && <InputModal crud="update" targetItem={updatingItem} onClose={setIsUpdateModalOpen} shoppingList={shoppingList} setShoppingList={setShoppingList} />}
    </main>
  )
}
