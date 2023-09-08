import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GambaError2 } from 'gamba'
import { GambaError, useGamba, useGambaError } from 'gamba/react'
import React from 'react'
import { Modal2 } from '../components/Modal/Modal'
import { Button2 } from '../components/Button/Button'

function InnerModal({ onDone, onCancel }: {onDone: () => void, onCancel: () => void}) {
  const [creating, setCreating] = React.useState(false)
  const [initUser, setInitUser] = React.useState(false)
  const gamba = useGamba()

  const create = async () => {
    try {
      setCreating(true)
      await gamba.client.initializeAccount()

      await gamba.client.userAccount.waitForState(
        (current) => {
          if (current.decoded?.created) {
            //
            return true
          }
        },
      )

      setInitUser(true)

      await gamba.client.userAccount.waitForState(
        (current) => {
          if (current.decoded?.status?.playing) {
            //
            return true
          }
        },
      )

      onDone()
    } catch {
      onCancel()
    } finally {
      setCreating(false)
    }
  }

  return (
    <Modal2 onClose={onCancel}>
      <h1>Wecome!</h1>
      In order to play you need to create an account to interract with the Solana program.<br />
      This only needs to be done once.
      <br />
      <br />
      <Button2 loading={creating} pulse onClick={create}>
        {!initUser ? 'Initialize Account' : 'Initializing user...'}
      </Button2>
    </Modal2>
  )
}

export function InitializeAccountModal() {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const [error, setError] = React.useState<GambaError2 | null>(null)

  useGambaError(
    (err) => {
      console.error(err)
      if (err.message === GambaError.PLAY_BEFORE_INITIALIZED) {
        if (wallet.connected) {
          err.handle()
          setError(err)
        } else {
          walletModal.setVisible(true)
        }
      }
    },
  )

  if (!error) return null

  return (
    <InnerModal
      onDone={() => {
        error.resolve()
        setError(null)
      }}
      onCancel={() => {
        error.reject()
        setError(null)
      }}
    />
  )
}