import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Input, Form, Button, Select} from "antd";
import {post} from "../../utilities";

const Progress = (props) => {

    const [prog, setProg] = useState([]);
    const [goals, setGoals] = useState([]);
    const [comments, setComments] = useState([]);
    const [goalInds, setGoalInds] = useState({});

    const color = {0: 'red', 1: 'yellow', 2: 'green'};

    useEffect(() => {
        post("/api/getGoals", {googleid: props.userId}).then((res) => {
            let N = res.length;
            let temp = [];
            for (let i = 0; i < N; i++) {
                temp = [...temp, {name: res[i].name, desc: res[i].desc}];
            }
            setGoals(temp);
        })
    }, [props.userId])

    useEffect(() => {
        post("/api/getProgress", {googleid: props.userId}).then((res) => {
            let N = res.length;
            let map = {};
            for (let i = 0; i < N; i++) {
                setComments([res[i].comment, ...comments]);
            }
            for (let i = 0; i < goals.length; i++) {
                map[goals[i].name] = i;
            }
            setGoalInds(map);
            let progress = [];

            for (let i = 0; i < N; i++) {
                let temp = Array(goals.length).fill(0);
                Object.keys(res[i].progress).map((goal, _) => {
                    temp[map[goal]] = 2*Number(res[i].progress[goal])-1;
                })
                progress = [[...temp], ...progress];
            }
            setProg(progress);
            console.log(progress);
        })
    }, [goals])

    return (
        <div style={{display: 'flex', 'flex-direction': 'row'}}>
            {
            Object.keys(prog).map((_, i) => 
                <div style={{display: 'flex', 'flex-direction': 'column', width: '50px'}}>
                    {Object.keys(prog[i]).map((_, j) => 
                        <div style={{background: color[prog[i][j]+1]}}>test</div>
                    )}
                </div>
            )
            }
        </div>
        
    )
};

export default Progress;