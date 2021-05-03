import React from "react"
import Progress from "../modules/Progress"

const PrivateProgress = (props) => {

    return (
        <>
        <Progress userId={props.userId}/>
        <div style={{'text-align': 'center'}}>This is your private progress page. Progress recorded here is not accessible to other users. </div>
        </>
    )
}

export default PrivateProgress;