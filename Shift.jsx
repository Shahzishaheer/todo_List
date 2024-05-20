import React from 'react'

export default function Shift( props) {
  return (
    <>
      <div className="form-check">
<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  defaultChecked={props.title==="Add-Item"}/>
<label className="form-check-label" htmlFor="flexRadioDefault1">
<div style={{ color: 'white'}}>
{props.title} 
<link rel="stylesheet" href={props.Other} />
</div>
</label>
</div>
    </>
  )
}
