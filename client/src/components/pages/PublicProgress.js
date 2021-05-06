import React, { useState, useEffect } from "react"
import Progress from "../modules/Progress"
import {get} from "../../utilities";

const PublicProgress = (props) => {
    const [valid, setValid]  = useState(false);
    const [same, setSame] = useState(false);
    const [name, setName] = useState('');


    useEffect(() => {
        get("/api/checkuser", {publicid: props.userId, userId: props.id}).then((res) => {
            console.log(res);
            if (res.status === 'invalid') {
                setValid(false);
            }
            else {
                setValid(true);
                setSame(res.status);
                setName(res.name);
            }
        })
    }, [props.id, props.userId])

    return (
        <>
        {props.userId.length === 32 && valid ? 
        <>
        <Progress userId={props.userId}/>
        {same === 'true' ? <div style={{'text-align': 'center', 'margin': '20% 0% 0%'}}>This is your public progress page. Send the link to your friends!</div> : 
        <div style={{'text-align': 'center', 'margin': '20% 0% 0%'}}>This is the public progress page of {name}</div>}
        </> : 
        <div style={{'text-align': 'center'}}>Ask friends to get links to their public progress pages, or log in to view your own public progress page!</div>
        }
        </>
    )
}

export default PublicProgress;