import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Radio, Popover, Button} from "antd";
import {post} from "../../utilities";

const Progress = (props) => {

    const [prog, setProg] = useState([]);
    const [goals, setGoals] = useState([]);
    const [comments, setComments] = useState([]);
    const [days, setDays] = useState(['temp']);
    const [pos, setPos] = useState('0');

    const color = {0: 'rgb(240,80,107)', 1: 'rgb(247,252,208)', 2: 'rgb(159,229,182)'};

    const color2 = (i,j) => {
        let blue = 5 + 25 * (5 - prog[i-2][j] - prog[i-1][j] - prog[i][j] - prog[i+1][j] - prog[i+2][j]);
        // return 'rgb(0,'.concat(blue.toString(), ',0)');
        return 'rgb(0,0,'.concat(blue.toString(), ')');
    }

    const dateFormat = (s) => {
        if (s === undefined) {
            return undefined;
        }
        let yy = s.substring(2,4);
        let mm = s.substring(5,7);
        let dd = s.substring(8,10);
        return mm.concat('/', dd, '/', yy); 
    }

    const handlePosChange = ({ target: { value } }) => {
        setPos(value);
    };

    const content = (i,j) => {

        if (j >= goals.length) {
            return <div>Loading</div>
        }

        return (
        <div>
          <p>Goal information: {goals[j].desc === '' ? 'None' : goals[j].desc}</p>
          <p>Comments on day: {comments[i] === '' ? 'None' : comments[i]}</p>
        </div>
        )
    };

    const goalContent = (i) => {
        if (i >= goals.length) {
            return <div>Loading</div>
        }

        return (
            <div>Goal information: {goals[i].desc === '' ? 'None' : goals[i].desc}</div>
        )
    }

    const dayContent = (i) => {
        if (i >= comments.length) {
            return <div>Loading</div>
        }
        return (
            <div>Comments on day: {comments[i] === '' ? 'None' : comments[i]}</div>
        )
    }

    useEffect(() => {
        console.log(props.userId);
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
            let comm = [];
            for (let i = 0; i < N; i++) {
                comm = [res[i].comment, ...comm];
            }
            setComments(comm);
            for (let i = 0; i < goals.length; i++) {
                map[goals[i].name] = i;
            }
            let progress = [];
            let day = [];

            for (let i = 0; i < N; i++) {
                let temp = Array(goals.length).fill(0);
                Object.keys(res[i].progress).map((goal, _) => {
                    temp[map[goal]] = 2*Number(res[i].progress[goal])-1;
                })
                progress = [[...temp], ...progress];
                day = [res[i].createdAt, ...day];
            }
            setProg(progress);
            setDays(day);
        })
    }, [goals])


    return (
        <>
        <Radio.Group onChange={handlePosChange} value="top"  style={{width: '80%', margin: '10px 10%'}}>
        <Radio.Button value='0' style={{width: '50%', 'text-align': 'center'}}>Progress</Radio.Button>
        <Radio.Button value='1' style={{width: '50%', 'text-align': 'center'}}>Averaged Progress</Radio.Button>
        </Radio.Group>

        { pos === '0' ? 
        <div style={{display: 'flex', 'flex-direction': 'row', width: String(200 + Math.min(1200, 80*prog.length)) + 'px', margin: '0% auto'}}>
            {
            <div style={{display: 'flex', 'flex-direction': 'column', width: '200px'}}>
            <Button style={{'width': '200px'}}/>
            {
                Object.keys(goals).map((_, i) => 
                <Popover content={goalContent(i)}>
                <Button style={{width: '200px'}}>
                    {goals[i].name}
                </Button>
                </Popover>)
            }
            </div>
            }
            <div style={{width: String(Math.min(1200, 80*prog.length)) + 'px', 'overflow-x': 'auto', display: 'flex', 'flex-direction': 'row-reverse'}}>
                <div style={{display: ' flex', 'flex-direction': 'row'}}>
            {
            Object.keys(prog).map((_, i) => 
                <div style={{display: 'flex', 'flex-direction': 'column'}}>
                    <Popover content={dayContent(i)}>
                    <Button style={{width: '80px'}}>{dateFormat(days[i])}</Button>
                    </Popover>
                    {
                    Object.keys(prog[i]).map((_, j) => 
                        <Popover content={content(i,j)}>
                            <Button style={{background: color[prog[i][j]+1], width: '80px'}}> </Button>
                        </Popover>
                    )}
                </div>
            )
            }
                </div>
            </div>
        </div>


            :

            <div style={{display: 'flex', 'flex-direction': 'row', width: String(200 + Math.min(1200, 80*Math.max(prog.length-4,0))) + 'px', margin: '0% auto'}}>
            {
            <div style={{display: 'flex', 'flex-direction': 'column', width: '200px'}}>
            <Button style={{'width': '200px'}}/>
            {
                Object.keys(goals).map((_, i) => 
                <Popover content={goalContent(i)}>
                <Button style={{'width': '200px'}}>
                    {goals[i].name}
                </Button>
                </Popover>)
            }
            </div>
            }
            <div style={{width: String(Math.min(1200, 80*Math.max(prog.length-4,0))) + 'px', 'overflow-x': 'auto', display: 'flex', 'flex-direction': 'row-reverse'}}>
            <div style={{display: ' flex', 'flex-direction': 'row'}}>
            {
            Object.keys(prog).map((_, i) => 
            (i >= 2 && i < prog.length -2) ? 
                <div style={{display: 'flex', 'flex-direction': 'column'}}>
                    <Popover content={dayContent(i)}>
                    <Button style={{width: '80px'}}>{dateFormat(days[i])}</Button>
                    </Popover>
                    {
                    Object.keys(prog[i]).map((_, j) => 
                        <Popover content={content(i,j)}>
                            <Button style={{background: color2(i,j), width: '80px'}}> </Button>
                        </Popover>
                    )}
                </div> : <div/>
            )
            }
                </div>
            </div>
        </div>
        }
        </>
    )
};

export default Progress;