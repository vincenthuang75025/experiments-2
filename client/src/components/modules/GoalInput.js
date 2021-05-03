import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Input, Form, Button} from "antd";
import {post} from "../../utilities";

const GoalInput = (props) => {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || desc === "") {
            setError("Name and description can't be empty");
        }
        else {
            if (props.userId.length === 24) {
                post("/api/addGoal", {googleid: props.userId, name: name, desc: desc}).then((res) => {
                    console.log(res);
                })
            }
            else {
                post("/api/addGoal", {googleid: props.userId, id: props.privateId, name: name, desc: desc}).then((res) => {
                    console.log(res);
                })
            }

            setName("");
            setDesc("");
            setError("");
        }
    }



    return (
        <>
        <Form style={{width: '98%', margin: 'auto'}}>
            <Input placeholder="Goal name" value={name} onChange={handleNameChange} style={{margin: '5px 0px'}}/>
            <Input placeholder="Goal description" value={desc} onChange={handleDescChange} style={{margin: '5px 0px 10px 0px'}}/>
            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
        <div style={{color: 'red'}}>{error}</div>
        </>
    )
}




export default GoalInput;