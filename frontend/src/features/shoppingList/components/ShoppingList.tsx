import React from 'react'
import { ShoppingItem } from './ShoppingItem'
import type { ShoppingItemType } from '../../../types/shoppingItem.types'

type Props = {
  dummyData: ShoppingItemType[]
  selectedMenu: string,
  openUpdateModal: (isItem: boolean, targetItem: ShoppingItemType) => void
}

export const ShoppingList = (props: Props) => {
  const { dummyData, openUpdateModal } = props;

  return (
    <section className="px-4 pb-6 sm:px-6">
      <div className="space-y-3 p-4 sm:p-6">
        {dummyData.map(item => (
          <ShoppingItem key={item.id} item={item} openUpdateModal={openUpdateModal} />
        ))}
      </div>
    </section>
  )
}
