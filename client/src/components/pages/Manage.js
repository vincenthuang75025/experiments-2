import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Radio} from "antd";
import ProgressInput from "../modules/ProgressInput"
import GoalInput from "../modules/GoalInput"

const Manage = (props) => {
    const [prog, setProg] = useState('0');
    const [id, setId] = useState(props.userId);

    useEffect(() => {
        setId(props.userId);
    }, [props.userId])

    const handlePrivChange = (event) => {
        setId(event.target.value === '0' ? props.userId : props.publicId);
    }

    const handleProgChange = (event) => {
        setProg(event.target.value);
    }

    return (
    <>
    <div style={{width: '60%', margin: '0px 20%'}}>
    <div>
    <Radio.Group onChange={handlePrivChange} defaultValue="0" style={{margin: '10px 0%', width: '100%'}}>
        <Radio.Button value='0' style={{width: '50%', 'text-align': 'center'}}>Private</Radio.Button>
        <Radio.Button value='1' style={{width: '50%', 'text-align': 'center'}}>Public</Radio.Button>
    </Radio.Group></div>

    <div>
    <Radio.Group onChange={handleProgChange} defaultValue="0" style={{margin: '0px 0% 10px', width: '100%'}}>
        <Radio.Button value='0' style={{width: '50%', 'text-align': 'center'}}>Add Progress</Radio.Button>
        <Radio.Button value='1' style={{width: '50%', 'text-align': 'center'}}>Add Goal</Radio.Button>
    </Radio.Group></div>
    
    {
        (prog === '0') ? <ProgressInput userId={id} privateId={props.userId}/>: <GoalInput userId={id} privateId={props.userId}/>
    }
    </div>
    </>
    )

}

export default Manage;