import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import type { ShoppingItemType } from '../../types/shoppingItem.types'

type Props = {
  crud: "add" | "update"
  targetItem?: ShoppingItemType
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingItemType[]>>
  shoppingList: ShoppingItemType[]
}

export const InputModal = (props: Props) => {
  const { crud, targetItem, onClose, shoppingList, setShoppingList } = props
  const [name, setName] = useState<string>(crud === "add" ? "" : `${targetItem?.name}`)
  const [neededFor1, setNeededFor1] = useState<string>(crud === "add" ? "" : `${targetItem?.neededFor[0]}`)
  const [neededFor2, setNeededFor2] = useState<string>(crud === "add" ? "" : `${targetItem?.neededFor[1]}`)
  const [neededFor3, setNeededFor3] = useState<string>(crud === "add" ? "" : `${targetItem?.neededFor[2]}`)
  const [isFood, setIsFood] = useState<boolean>(crud === "add" ? true : targetItem ? targetItem.isFood : true)

  const handleSubmit = async () => {
    try {
      if (crud === "add") {
        const res = await fetch("http://localhost:3000/item", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            neededFor: [neededFor1, neededFor2, neededFor3],
            isFood
          })
        })
        const data = await res.json()
        if (!res.ok) {
          alert(`${data.error}`)
        }
        const listExceptTarget = shoppingList.filter(element => element.id !== targetItem?.id)
        const newList = [...listExceptTarget, data]
        setShoppingList(newList)
        return
      } else if (crud === "update") {
        const res = await fetch(`http://localhost:3000/item/${targetItem?.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            neededFor: [neededFor1, neededFor2, neededFor3],
            isFood
          })
        })
        const data = await res.json()
        if (!res.ok) {
          alert(`${data.error}`)
        }
        const listExceptTarget = shoppingList.filter(element => element.id !== targetItem?.id)
        const newList = [...listExceptTarget, data]
        setShoppingList(newList)
        return
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6" onClick={() => onClose(false)}>
      <div
        className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/20 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          {crud === "add" ? 'Create a shopping item' : 'Edit shopping item'}
        </h2>
        <FormGroup className="gap-4">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '18px',
                backgroundColor: '#f8fafc',
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Needed for..."
            variant="outlined"
            value={neededFor1}
            onChange={(e) => setNeededFor1(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '18px',
                backgroundColor: '#f8fafc',
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Needed for..."
            variant="outlined"
            value={neededFor2}
            onChange={(e) => setNeededFor2(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '18px',
                backgroundColor: '#f8fafc',
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Needed for..."
            variant="outlined"
            value={neededFor3}
            onChange={(e) => setNeededFor3(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '18px',
                backgroundColor: '#f8fafc',
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => setIsFood(e.target.checked)}
                sx={{
                  color: '#94a3b8',
                  '&.Mui-checked': {
                    color: '#0f766e',
                  },
                }}
              />
            }
            label="Food"
            value={crud === "add" ? true : targetItem?.isFood}
            className="m-0 flex min-h-[40px] justify-start rounded-[18px] border border-slate-300 bg-slate-50 px-3 py-0.5"
            sx={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              margin: 0,
              '.MuiFormControlLabel-label': {
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#0f172a',
                textAlign: 'left',
              },
            }}
          />
        </FormGroup>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              minWidth: 132,
              borderRadius: '16px',
              px: 3,
              py: 1.25,
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: 'none',
              backgroundColor: '#0f766e',
              '&:hover': {
                backgroundColor: '#115e59',
                boxShadow: 'none',
              },
            }}
          >
            {crud === "add" ? "Add" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  )
}
