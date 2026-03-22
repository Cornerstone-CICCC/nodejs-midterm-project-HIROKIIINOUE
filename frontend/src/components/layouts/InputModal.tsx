import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React from 'react'
import type { ShoppingItemType } from '../../types/shoppingItem.types'

type Props = {
  crud: "add" | "update"
  targetItem?: ShoppingItemType
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export const InputModal = (props: Props) => {
  const { crud, targetItem, onClose } = props

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
            value={crud === "add" ? "" : `${targetItem?.name}`}
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
            value={crud === "add" ? "" : `${targetItem?.neededFor[0] ?? ""}`}
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
            value={crud === "add" ? "" : `${targetItem?.neededFor[1] ?? ""}`}
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
            value={crud === "add" ? "" : `${targetItem?.neededFor[2] ?? ""}`}
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
