import React from 'react'
import Dice from './games/Dice/Dice'
import HiLo from './games/HiLo/Hilo'
import Mines from './games/Mines/Mines'
import Roulette from './games/Roulette/Roulette'

const GambaGamePack = {
  dice: {
    id: 'dice',
    meta: { background: '#ff6490' },
    name: 'Dice',
    image: '/games/dice.png',
    description: `
      Use the slider to pick a number, then roll below that number to win. Lower numbers will increase your potential payout, while higher ones are safer.
    `,
    app: () => <Dice />,
  },
  slots: {
    id: 'slots',
    name: 'Slots',
    image: '/games/slots.png',
    meta: { background: '#5465ff' },
    description: `
      SlotsSlotsSlotsSlotsSlotsSlotsSlotsSlotsSlots
    `,
    app: React.lazy(() => import('./games/Slots/Slots')),
  },
  flip: {
    id: 'flip',
    name: 'Flip',
    description: `
    Flip.
    `,
    meta: { background: '#ffe694' },
    image: '/games/flip.png',
    app: React.lazy(() => import('./games/Flip/Flip')),
  },
  plinko: {
    id: 'plinko',
    name: 'Plinko',
    description: `
      Plinko
    `,
    meta: { background: '#7272ff' },
    image: '/games/plinko.png',
    app: React.lazy(() => import('./games/Plinko/Plinko')),
  },
  hilo: {
    id: 'hilo',
    name: 'HiLo',
    image: '/games/hilo.png',
    meta: { background: '#77bbff' },
    description: 'Guess if the next card is going to be higher or lower than the current one. Continue until you want to cash out!',
    app: () => <HiLo logo="/logo.svg" />,
  },
  mines: {
    id: 'mines',
    name: 'Mines',
    description: `
      MinesMinesMinesMinesMinesMinesMines
    `,
    meta: { background: '#8376ff' },
    image: '/games/mines.png',
    app: () => <Mines />,
  },
  roulette: {
    id: 'roulette',
    name: 'Roulette',
    image: '/games/roulette.png',
    meta: { background: '#1de87e' },
    description: `
      A miniature version of Roulette.
    `,
    app: () => <Roulette />,
  },
}

export default GambaGamePack
