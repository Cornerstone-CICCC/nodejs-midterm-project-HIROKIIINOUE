import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import React from 'react'
import { SelectBox } from '../../../components';
import type { ShoppingItemType } from '../../../types/shoppingItem.types';

type Props = {
  shoppingItems: ShoppingItemType[]
  selectedMenu: string,
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const FunctionButtons = (props: Props) => {
  const { shoppingItems, selectedMenu, setSelectedMenu, setIsAddModalOpen } = props

  const handleAllClear = async () => {
    if (!confirm("Are you sure to delete all items?")) return;
    try {
      const res = await fetch("http://localhost:3000/item", {
        method: "DELETE"
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error)
      }
      window.location.href = "/"
      alert(data.message)
      return
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="px-4 py-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70 sm:p-5 lg:flex-row lg:items-center justify-center">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <div className="grid grid-cols-2 gap-3 sm:contents">
            <Button
              variant="contained"
              onClick={() => setIsAddModalOpen(true)}
              endIcon={<AddCircleOutlineIcon />}
              sx={{
                borderRadius: '16px',
                px: 2.5,
                py: 1.4,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: 'none',
                backgroundColor: '#0f766e',
                '&:hover': {
                  backgroundColor: '#115e59',
                  boxShadow: 'none',
                },
              }}
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={handleAllClear}
              endIcon={<DeleteSweepIcon />}
              sx={{
                borderRadius: '16px',
                px: 2.5,
                py: 1.4,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: 'none',
                backgroundColor: '#1e293b',
                '&:hover': {
                  backgroundColor: '#0f172a',
                  boxShadow: 'none',
                },
              }}
            >
              Clear
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-1 sm:ml-1">
            <SelectBox shoppingItems={shoppingItems} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          </div>
        </div>
      </div>
    </section>
  )
}
