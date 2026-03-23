import React from 'react'
import { ShoppingItem } from './ShoppingItem'
import type { ShoppingItemType } from '../../../types/shoppingItem.types'

type Props = {
  shoppingItems: ShoppingItemType[]
  selectedMenu: string,
  openUpdateModal: (isItem: boolean, targetItem: ShoppingItemType) => void
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingItemType[]>>
}

export const ShoppingList = (props: Props) => {
  const { openUpdateModal, shoppingItems, setShoppingList } = props;

  const handleRenewList = (id: string) => {
    const newList = shoppingItems.filter((item) => item.id !== id)
    setShoppingList(newList)
  }

  return (
    <section className="px-4 pb-6 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-3 p-4 sm:p-6">
        {shoppingItems.map(item => (
          <ShoppingItem key={item.id} item={item} openUpdateModal={openUpdateModal} handleRenewList={handleRenewList} />
        ))}
      </div>
    </section>
  )
}
