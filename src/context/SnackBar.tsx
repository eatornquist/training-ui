import {
  Alert,
  AlertColor,
  Box,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from '@mui/material'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

export interface SnackBarOptions {
  handleClose?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void
  hideDuration?: number
  placement?: SnackbarOrigin
  severity: AlertColor
  action?: ReactNode
  closeIcon?: boolean
}

const SnackBarContext = createContext<{
  create: (message: string | ReactNode, opt: SnackBarOptions) => void
  remove: () => void
} | null>(null)

export const useSnackBarContext = () => {
  const context = useContext(SnackBarContext)
  if (context === null)
    throw new Error(
      'useSnackBarContext must be used within a SnackBarContext provider'
    )
  return context
}

export const SnackBarContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [item, setItem] = useState<{
    message: string | ReactNode
    opt: SnackBarOptions
  } | null>(null)

  const create = (message: string | ReactNode, opt: SnackBarOptions) => {
    setItem({ message, opt })
  }
  const remove = () => {
    setItem(null)
  }

  return (
    <SnackBarContext.Provider value={{ create, remove }}>
      {children}

      <Snackbar
        open={Boolean(item)}
        onClose={(evt, reason) => {
          item?.opt.handleClose && item.opt.handleClose(evt, reason)
          setItem(null)
        }}
        autoHideDuration={item?.opt.hideDuration ?? 4000}
        anchorOrigin={
          item?.opt.placement ?? { vertical: 'bottom', horizontal: 'center' }
        }
      >
        <Alert
          data-testid="snackbar"
          severity={item?.opt.severity}
          sx={{
            backgroundColor: (theme) => theme.palette.darkNeutrals['400'],
            borderLeft: (theme) =>
              `12px solid ${
                theme.palette[item?.opt?.severity ?? 'info']['main']
              }`,
            color: (theme) => theme.palette.neutral['100'],
            alignItems: 'center',
          }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {item?.opt.action}
              {item?.opt.closeIcon && (
                <IconButton
                  onClick={(evt) => {
                    item?.opt.handleClose &&
                      item.opt.handleClose(evt, 'timeout')
                    setItem(null)
                  }}
                >
                  <CloseIcon fontSize="small" sx={{ color: 'white' }} />
                </IconButton>
              )}
            </Box>
          }
        >
          {item?.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
}
