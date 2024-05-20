    import React from 'react'

    export default function alert(props) {
    return (
        <>
      <div  style={{height:"60px", position:"fixed", left:"0", top:"0"}}>

      { props.alert &&  <div className={`alert alert-${props.alert.Type} d-flex align-items-center`} role="alert">
 
  <div>
   <p><strong>{props.alert.Type} :</strong> <b> {props.alert.msg}</b></p> 
  </div>
</div> }         
        </div>  
        </>
    )
    }
