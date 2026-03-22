import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import type { ShoppingItemType } from '../../../types/shoppingItem.types'

type Props = {
  item: ShoppingItemType
}

export const ShoppingItem = (props: Props) => {
  const { item } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <article
      className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 transition sm:px-4 ${item.isCompleted
        ? 'border-slate-200 bg-slate-100/80 text-slate-400 opacity-45 grayscale'
        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
        }`}
    >
      <div className="flex min-w-0 items-center gap-3 overflow-hidden">
        <div
          className={`h-3 w-3 shrink-0 rounded-full ${item.isCompleted ? 'bg-emerald-500' : item.isFood ? 'bg-teal-600' : 'bg-slate-400'
            }`}
        />

        <div className="min-w-0">
          <p
            className={`truncate text-sm font-semibold capitalize sm:text-base ${item.isCompleted ? 'text-slate-400 line-through decoration-2' : 'text-slate-900'
              }`}
          >
            {item.name}
          </p>
        </div>

        <div className="hidden min-w-0 items-center gap-2 sm:flex">
          {item.neededFor.length > 0 ? (
            item.neededFor.map((menu) => (
              <span
                key={menu}
                className={`truncate rounded-full px-2.5 py-1 text-xs font-semibold ${item.isCompleted
                  ? 'bg-slate-200 text-slate-400'
                  : 'bg-teal-50 text-teal-700'
                  }`}
              >
                {menu}
              </span>
            ))
          ) : (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.isCompleted
                ? 'bg-slate-200 text-slate-400'
                : 'bg-slate-200 text-slate-600'
                }`}
            >
              General
            </span>
          )}
        </div>
      </div>

      <div className={`flex shrink-0 items-center gap-1 ${item.isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
        <button
          type="button"
          className={`rounded-xl p-2 transition ${item.isCompleted
            ? 'hover:bg-slate-300 hover:text-slate-500'
            : 'hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          aria-label={`Complete ${item.name}`}
        >
          <CheckCircleOutlineIcon fontSize="small" />
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            className={`rounded-xl p-2 transition ${item.isCompleted
              ? 'hover:bg-slate-300 hover:text-slate-500'
              : 'hover:bg-slate-200 hover:text-slate-700'
              }`}
            aria-label={`Edit ${item.name}`}
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            type="button"
            className={`rounded-xl p-2 transition ${item.isCompleted
              ? 'hover:bg-slate-300 hover:text-slate-500'
              : 'hover:bg-rose-50 hover:text-rose-600'
              }`}
            aria-label={`Delete ${item.name}`}
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>

        <div className="sm:hidden">
          <IconButton
            onClick={handleOpenMenu}
            aria-label={`More actions for ${item.name}`}
            aria-controls={isMenuOpen ? `shopping-item-menu-${item.id}` : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            sx={{
              borderRadius: '12px',
              color: item.isCompleted ? '#94a3b8' : '#64748b',
              '&:hover': {
                backgroundColor: item.isCompleted ? '#cbd5e1' : '#e2e8f0',
                color: item.isCompleted ? '#64748b' : '#334155',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Menu
            id={`shopping-item-menu-${item.id}`}
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
                },
              },
            }}
          >
            <MenuItem onClick={handleCloseMenu} sx={{ gap: 1.25, color: '#334155' }}>
              <EditIcon fontSize="small" />
              Edit
            </MenuItem>
            <MenuItem onClick={handleCloseMenu} sx={{ gap: 1.25, color: '#dc2626' }}>
              <DeleteIcon fontSize="small" />
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </article>
  )
}
