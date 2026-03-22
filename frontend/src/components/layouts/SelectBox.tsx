import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import React from 'react'
import type { ShoppingItemType } from '../../types/shoppingItem.types'

type Props = {
  dummyData: ShoppingItemType[]
  selectedMenu: string,
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>
}

export const SelectBox = (props: Props) => {
  const { dummyData, selectedMenu, setSelectedMenu } = props;
  const menuList: string[] = []

  dummyData.forEach(element => {
    if (!element.isFood) return
    if (element.neededFor.length === 1) {
      return menuList.push(element.neededFor[0])
    } else if (element.neededFor.length > 1) {
      element.neededFor.forEach(menu => {
        menuList.push(menu)
      })
    }
    return;
  })
  const uniqueMenuList = menuList.filter((item, index) => menuList.indexOf(item) === index)


  const handleChange = (event: SelectChangeEvent) => {
    setSelectedMenu(event.target.value);
  };

  return (
    <div className="w-full min-w-[220px] sm:min-w-[240px]">
      <FormControl
        fullWidth
        size="small"
        sx={{
          m: 0,
          '& .MuiInputLabel-root': {
            color: '#475569',
            fontWeight: 600,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#0f766e',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            fontWeight: 600,
            color: '#0f172a',
            '& fieldset': {
              borderColor: '#cbd5e1',
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0f766e',
              borderWidth: '2px',
            },
          },
          '& .MuiSelect-select': {
            py: 1.5,
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            marginTop: '8px',
            color: '#64748b',
            fontSize: '0.75rem',
            fontWeight: 500,
          },
        }}
      >
        <InputLabel>Menu</InputLabel>
        <Select
          value={selectedMenu}
          label="Menu"
          onChange={handleChange}
        >
          {uniqueMenuList.map(menu => (
            <MenuItem value={menu}>{menu}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose Your Menu</FormHelperText>
      </FormControl>
    </div>
  )
}
