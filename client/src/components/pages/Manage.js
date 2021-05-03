import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Radio, Popover, Button} from "antd";
import ProgressInput from "../modules/ProgressInput"
import GoalInput from "../modules/GoalInput"

const Manage = (props) => {
    const [priv, setPriv] = useState('0');
    const [prog, setProg] = useState('0');
    const [id, setId] = useState(props.userId);

    useEffect(() => {
        setId(props.userId);
    }, [props.userId])

    const handlePrivChange = (event) => {
        setPriv(event.target.value);
        setId(event.target.value === '0' ? props.userId : props.publicId);
    }

    const handleProgChange = (event) => {
        setProg(event.target.value);
        console.log(event.target.value);
    }

    return (
    <>
    <div>
    <Radio.Group onChange={handlePrivChange} defaultValue="0">
        <Radio.Button value='0'>Private</Radio.Button>
        <Radio.Button value='1'>Public</Radio.Button>
    </Radio.Group></div>

    <div>
    <Radio.Group onChange={handleProgChange} defaultValue="0">
        <Radio.Button value='0'>Add Progress</Radio.Button>
        <Radio.Button value='1'>Add Goal</Radio.Button>
    </Radio.Group></div>
    
    {
        (prog === '0') ? <ProgressInput userId={id}/>: <GoalInput userId={id}/>
    }
    </>
    )

}

export default Manage;