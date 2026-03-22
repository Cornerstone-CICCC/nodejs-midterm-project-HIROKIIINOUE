import React, { useState } from 'react'
import { FunctionButtons } from './FunctionButtons'
import { ShoppingList } from './ShoppingList'
import { Button } from '@mui/material'
import { dummyShoppingList } from '../../../data/dummyData'
import type { ShoppingItemType } from '../../../types/shoppingItem.types'

export const Container = () => {
  const dummyData: ShoppingItemType[] = dummyShoppingList
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  return (
    <main>
      <FunctionButtons dummyData={dummyData} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ShoppingList dummyData={dummyData} selectedMenu={selectedMenu} />
      <Button variant="contained">Contained</Button>
    </main>
  )
}
