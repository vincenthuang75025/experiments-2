import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Input, Button, Select, Popover} from "antd";
import {post} from "../../utilities";

const {Option} = Select;

const ProgressInput = (props) => {

    const [goals, setGoals] = useState([]);
    const [vals, setVals] = useState({});
    const [comment, setComment] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const content = (i) => {
        return (
            <div>{goals[i].desc}</div>
        )
    }


    useEffect(() => {
        post("/api/getGoals", {googleid: props.userId}).then((res) => {
            let N = res.length;
            setVals(Array(N).fill('smth'));
            let temp = [];
            for (let i = 0; i < N; i++) {
                temp = [...temp, {name: res[i].name, desc: res[i].desc}];
            }
            setGoals(temp);
            let tempVals = {};
            for (let i = 0; i < N; i ++) {
                tempVals[i] = 0;
            }
            setVals(tempVals);
        }).catch();
    }, [props.userId])

    const handleChange = (event, i) => {
        setVals({...vals, [i]: event});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment === "") {
            setErrorMsg("Add a comment about today!");
        }
        else {
            setErrorMsg("");
            let prog = {};
            for (let i = 0; i < goals.length; i ++) {
                prog[goals[i].name] = vals[i];
            }
            if (props.userId.length === 24) {
                post("/api/sendProgress", {googleid: props.userId, progress: prog, comment: comment}).then((res) => {
                    console.log(res);
                    setComment("");
                });
            }
            else {
                post("/api/sendProgress", {googleid: props.userId, progress: prog, comment: comment, id: props.privateId}).then((res) => {
                    console.log(res);
                    setComment("");
                });
            }
        }
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }


    return (
        <>
        <div style={{display: 'flex', 'flex-direction': 'column'}}>
            {Object.keys(Array(goals.length).fill(0)).map((_, i) => 
                <div key={i} style={{display: 'flex', 'flex-direction': 'row', margin: '2px 0px'}}>
                    <Popover content={content(i)}>
                        <Button style={{width: '75%'}}>{goals[i].name}</Button>
                    </Popover>
                    <Select style={{ width: '25%'}} defaultValue='No' onChange={(e) => handleChange(e, i)}>
                    <Option key={(i, 1)} value={1}>Yes</Option>
                    <Option key={(i, 0)} value={0}>No</Option>
                    </Select>
                </div>
            )}
        </div>
        <Input placeholder='Other Comments' value={comment} onChange={handleCommentChange} style={{margin: '2px'}}/>
        <Button onClick={handleSubmit} style={{margin: '2px', width: '100%'}}>Submit</Button>
        <div style={{color: 'red'}}>{errorMsg}</div>
        </>
    )
}

export default ProgressInput;