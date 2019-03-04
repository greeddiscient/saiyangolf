import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'


const dataDrill = [
  {
    id: 1,
    name: 'Driving',
    description: 'Pick an imaginary fairway 30 yards wide on the range. Hit in between that fairway. Score yourself out of 10 on fairways hit.',
    type: [
      { id: 1, name: 'Driver', total: 10, description: 'Pick an imaginary fairway 30 yards wide on the range. Hit in between that fairway. Score yourself out of 10 on fairways hit.' },
      { if: 2, name: 'Fairway wood', total: 10, description: 'Pick an imaginary fairway 30 yards wide on the range. Hit in between that fairway. Score yourself out of 10 on fairways hit.' }
    ]
  },
  {
    id: 2,
    name: 'Approach',
    description: 'Pick a target at 225 yards (200/175/150/130) out. Hit at that target. +1 point if ball lands within a 10 yard radius.',
    type: [
      { id: 1, name: '225 Yards', total: 10, description: 'Pick a target at 225 yards (atau 200/175/150/130) out. Hit at that target. +1 point if ball lands within a 10 yard radius.'},
      { id: 2, name: '200 Yards', total: 10, description: 'Pick a target at 225 yards (atau 200/175/150/130) out. Hit at that target. +1 point if ball lands within a 10 yard radius.' },
      { id: 3, name: '175 Yards', total: 10, description: 'Pick a target at 225 yards (atau 200/175/150/130) out. Hit at that target. +1 point if ball lands within a 10 yard radius.' },
      { id: 4, name: '150 Yards', total: 10, description: 'Pick a target at 225 yards (atau 200/175/150/130) out. Hit at that target. +1 point if ball lands within a 10 yard radius.' },
      { id: 5, name: '130 Yards', total: 10, description: 'Pick a target at 225 yards (atau 200/175/150/130) out. Hit at that target. +1 point if ball lands within a 10 yard radius.' },
    ]
  },
  {
    id: 3,
    name: 'Wedge Game',
    description: 'Pick a target at X yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.',
    type: [
      { id: 1, name: '125 Yards', total: 10, description: 'Pick a target at 125 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
      { id: 2, name: '110 Yards', total: 10, description: 'Pick a target at 110 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
      { id: 3, name: '100 Yards', total: 10, description: 'Pick a target at 100 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
      { id: 4, name: '90 Yards', total: 10, description: 'Pick a target at 90 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
      { id: 5, name: '80 Yards', total: 10, description: 'Pick a target at 80 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
      { id: 6, name: '70 Yards', total: 10, description: 'Pick a target at 70 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
      { id: 7, name: '60 Yards', total: 10, description: 'Pick a target at 60 yards out. Hit at that target. +1 point if ball lands within a 5 yard radius.' },
    ]
  },
  {
    id: 4,
    name: 'Chipping',
    description: 'Chip to a flag X yards out. +1 point if ball lands within a 9 foot radius.',
    type: [
      { id: 1, name: '50 Yard Chip', total: 10, description: 'Chip to a flag 50 yards out. +1 point if ball lands within a 9 foot radius.'},
      { id: 2, name: '40 Yard Chip', total: 10, description: 'Chip to a flag 40 yards out. +1 point if ball lands within a 6 foot radius.' },
      { id: 3, name: '30 Yard Chip', total: 10, description: 'Chip to a flag 30 yards out. +1 point if ball lands within a 4 foot radius.' },
      { id: 4, name: '20 Yard Chip Short Side', total: 10, description: 'Chip to a flag 20 yards out. +1 point if ball lands within a 4 foot radius.' },
      { id: 5, name: '20 Yard Chip Long Side', total: 10, description: 'Chip to a flag 20 yards out. +1 point if ball lands within a 4 foot radius.' },
      { id: 6, name: '10 Yard Chip Short Side', total: 10, description: 'Chip to a flag 10 yards out. +1 point if ball lands within a 4 foot radius.' },
      { id: 7, name: '10 Yard Chip Long Side', total: 10, description: 'Chip to a flag 10 yards out. +1 point if ball lands within a 4 foot radius.' },
    ]
  },
  {
    id: 5,
    name: 'Sand',
    description: 'Sand blast a flag X yards out. +1 point if ball lands within a 9 foot radius.',
    type: [
      {id: 1, name: '20 Yard Sand Shot', total: 10, description: 'Sand blast a flag 20 yards out. +1 point if ball lands within a 9 foot radius.'},
      {id: 2, name: '10 Yard Sand Shot', total: 10, description: 'Sand blast a flag 10 yards out. +1 point if ball lands within a 9 foot radius.'}
    ]
  },
  {
    id: 6,
    name: 'Putting',
    description: 'Putt to a hole 30/45/60 feet out. +1 point if ball lands within a 3/4.5/6 feet radius.',
    type: [
      {id: 1, name: 'Lag put 60 feet', total: 10, description: 'Putt to a hole 60 feet out. +1 point if ball lands within a 6 feet radius.'},
      {id: 2, name: 'Lag put 45 feet', total: 10, description: 'Putt to a hole 45 feet out. +1 point if ball lands within a 4.5 feet radius.'},
      {id: 3, name: 'Lag put 30 feet', total: 10, description: 'Putt to a hole 30 feet out. +1 point if ball lands within a 3 feet radius.'},
      {id: 4, name: '15 feet putt', total: 10, description: 'Putt to a hole 15 feet out. +1 point for made putt'},
      {id: 5, name: '50 3 footers in a row!', total: 50, description: 'Make 50 3 footers in a row to boost your confidence'},
      {id: 6, name: 'Cross drill minimal break', total: 20, description: 'Putt in a cross shape at each side for 3,4,5,6,9 ft putts for a hole that doesnt break that much. +1 point for made putt'},
      {id: 7, name: 'Cross drill maximum break', total: 20, description: 'Putt in a cross shape at each side for 3,4,5,6,9 ft putts for a hole that breaks a lot. +1 point for made putt.'}
    ]
  }
]

export default {
  dataDrill
}


