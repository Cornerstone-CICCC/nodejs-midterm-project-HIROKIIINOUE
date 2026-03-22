import React, { useState } from 'react'
import { FunctionButtons } from './FunctionButtons'
import { ShoppingList } from './ShoppingList'
import { Button } from '@mui/material'
import { dummyShoppingList } from '../../../data/dummyData'
import type { ShoppingItem } from '../../../types/shoppingItem.types'

export const Container = () => {
  const dummyData: ShoppingItem[] = dummyShoppingList
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  return (
    <main>
      <FunctionButtons dummyData={dummyData} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ShoppingList />
      <Button variant="contained">Contained</Button>
    </main>
  )
}
