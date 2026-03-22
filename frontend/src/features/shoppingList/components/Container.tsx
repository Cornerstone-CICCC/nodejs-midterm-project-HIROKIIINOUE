import React, { useState } from 'react'
import { FunctionButtons } from './FunctionButtons'
import { ShoppingList } from './ShoppingList'
import { Button } from '@mui/material'
import { dummyShoppingList } from '../../../data/dummyData'
import type { ShoppingItemType } from '../../../types/shoppingItem.types'
import { InputModal } from '../../../components'

export const Container = () => {
  const dummyData: ShoppingItemType[] = dummyShoppingList
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
      <FunctionButtons dummyData={dummyData} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setIsAddModalOpen={setIsAddModalOpen} />
      <ShoppingList dummyData={dummyData} selectedMenu={selectedMenu} openUpdateModal={openUpdateModal} />
      <Button variant="contained">Contained</Button>
      {isAddModalOpen && <InputModal crud="add" onClose={setIsAddModalOpen} />}
      {isUpdateModalOpen && <InputModal crud="update" targetItem={updatingItem} onClose={setIsUpdateModalOpen} />}
    </main>
  )
}
