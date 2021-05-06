import React from "react"
import Progress from "../modules/Progress"

const PrivateProgress = (props) => {

    return ( props.userId ? 
        <>
        <Progress userId={props.userId}/>
        <div style={{'text-align': 'center', 'margin': '20% 0% 0%'}}>This is your private progress page. Progress recorded here is not accessible to other users. </div>
        </> : <div style={{'text-align': 'center'}}>Log in to see your private progress!</div>
    )
}

export default PrivateProgress;