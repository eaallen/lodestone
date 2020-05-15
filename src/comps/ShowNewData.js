import React from 'react'
import { withFirebase } from './Firebase'
import {Spinner} from 'react-bootstrap'
function ShowNewData (props){
    const click = () =>{
        props.context.set_loading()
    }
    return(
        <span className="link" onClick={e=>click()}> {props.context.loading? <><Spinner animation="border" size="sm" /></>:<>Change Data</>}</span>   
    )
}
export default withFirebase(ShowNewData)