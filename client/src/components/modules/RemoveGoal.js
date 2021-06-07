import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Button, Select} from "antd";
import {post} from "../../utilities";

const {Option} = Select;

const RemoveGoal = (props) => {

    const [goals, setGoals] = useState([]);
    const [ind, setInd] = useState(0);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        post("/api/getGoals", {googleid: props.userId}).then((res) => {
            let N = res.length;
            let temp = [];
            for (let i = 0; i < N; i++) {
                temp = [...temp, {name: res[i].name, desc: res[i].desc}];
            }
            setGoals(temp);
        }).catch();
    }, [props.userId, toggle])

    const handleChange = (event) => {
        setInd(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/api/deleteGoal", {googleid: props.userId, id: props.privateId, name: goals[ind].name}).then((res) => {
            setToggle(!toggle);
        })
    }


    return (
        goals.length === 0 ? <div style={{'text-align': 'center'}}>No goals to remove</div>: 
        <div style={{'margin': '0% 20%'}}>
        <div style={{'text-align': 'center'}}>Select a goal to remove:</div>
        <Select style={{ width: '100%'}} onChange={(e) => handleChange(e)}>
            {goals.map((_, i) => <Option key={i} value={i}>{goals[i].name}</Option>)}
        </Select>
        <Button onClick={handleSubmit} style={{margin: '2px', width: '100%'}}>Submit</Button>
        </div>
    )
}

export default RemoveGoal;