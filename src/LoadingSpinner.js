import React from 'react'

export default function LoadingSpinner(props) {
  return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader large">Lade {props.name || 'Daten'}...</div>
    </div>
  )
}
