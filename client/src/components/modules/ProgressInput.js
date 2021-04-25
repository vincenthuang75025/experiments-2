import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Input, Form, Button, Select} from "antd";
import {post} from "../../utilities";

const {Option} = Select;

const ProgressInput = (props) => {

    const [goals, setGoals] = useState([]);
    const [vals, setVals] = useState({});


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
        })
    }, [props.userId])

    const handleChange = (event, i) => {
        setVals({...vals, [i]: event});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let prog = {};
        for (let i = 0; i < goals.length; i ++) {
            prog[goals[i].name] = vals[i];
        }
        post("/api/sendProgress", {googleid: props.userId, progress: prog}).then((res) => {
            console.log(res);
        });
    }


    return (
        <>
        {Object.keys(Array(goals.length).fill(0)).map((ind, i) => 
            <div key={i}>
                <Select style={{ width: 120 }} defaultValue='No' onChange={(e) => handleChange(e, i)}>
                <Option key={(i, 1)} value={1}>Yes</Option>
                <Option key={(i, 0)} value={0}>No</Option>
                </Select>
            </div>
        )}
        <Button onClick={handleSubmit}>submit</Button>
        </>
    )
}

export default ProgressInput;