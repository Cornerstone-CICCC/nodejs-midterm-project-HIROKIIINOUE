import React, { useState } from 'react'
import { FunctionButtons } from './FunctionButtons'
import { ShoppingList } from './ShoppingList'
import { Button } from '@mui/material'
import type { ShoppingItemType } from '../../../types/shoppingItem.types'
import { InputModal } from '../../../components'
import { useShoppingItem } from '../../../hooks/useShoppingItem'

export const Container = () => {
  const { shoppingItems } = useShoppingItem()

  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [updatingItem, setUpdatingItem] = useState<ShoppingItemType | undefined>(undefined)

  const openUpdateModal = (isOpen: boolean, targetItem: ShoppingItemType) => {
    setIsUpdateModalOpen(isOpen);
    setUpdatingItem(targetItem)
  }

  return (
    <main>
      <FunctionButtons shoppingItems={shoppingItems} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setIsAddModalOpen={setIsAddModalOpen} />
      <ShoppingList shoppingItems={shoppingItems} selectedMenu={selectedMenu} openUpdateModal={openUpdateModal} />
      <Button variant="contained">Contained</Button>
      {isAddModalOpen && <InputModal crud="add" onClose={setIsAddModalOpen} />}
      {isUpdateModalOpen && <InputModal crud="update" targetItem={updatingItem} onClose={setIsUpdateModalOpen} />}
    </main>
  )
}
