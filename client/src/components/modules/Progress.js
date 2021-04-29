import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import {Radio, Popover, Button} from "antd";
import {post} from "../../utilities";

const Progress = (props) => {

    const [prog, setProg] = useState([]);
    const [goals, setGoals] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeDay, setActiveDay] = useState(-1);
    const [activeGoal, setActiveGoal] = useState(-1);
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

    const handleProgClick = (i,j) => {
        setActiveDay(i);
        setActiveGoal(j);
    };

    const content = (i,j) => (
        <div>
          <p>Goal information: {goals[j].desc === '' ? 'None' : goals[j].desc}</p>
          <p>Comments on day: {comments[i] === '' ? 'None' : comments[i]}</p>
        </div>
      );

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
        <Radio.Group onChange={handlePosChange} value="top">
        <Radio.Button value='0'>Progress</Radio.Button>
        <Radio.Button value='1'>Averaged Progress</Radio.Button>
        </Radio.Group>

        { pos === '0' ? 
        <div style={{display: 'flex', 'flex-direction': 'row'}}>
            {
            <div style={{display: 'flex', 'flex-direction': 'column', 'width': '100px'}}>
            <Button/>
            {
                Object.keys(goals).map((_, i) => 
                <Button onClick={(e) => setActiveGoal(i)}>
                    {goals[i].name}
                </Button>)
            }
            </div>
            }
            {
            Object.keys(prog).map((_, i) => 
                <div style={{display: 'flex', 'flex-direction': 'column', width: '100px'}}>
                    <Button onClick={(e) => setActiveDay(i)}>{dateFormat(days[i])}</Button>
                    {
                    Object.keys(prog[i]).map((_, j) => 
                        <Popover content={content(i,j)}>
                            <Button style={{background: color[prog[i][j]+1]}} onClick={(e) => handleProgClick(i,j)}> </Button>
                        </Popover>
                    )}
                </div>
            )
            }
        </div>


            :

        <div style={{display: 'flex', 'flex-direction': 'row'}}>
            {
            <div style={{display: 'flex', 'flex-direction': 'column', 'width': '100px'}}>
            <Button/>
            {
                Object.keys(goals).map((_, i) => 
                <Button onClick={(e) => setActiveGoal(i)}>
                    {goals[i].name}
                </Button>)
            }
            </div>
            }
            {
            Object.keys(prog).map((_, i) => 
            (i >= 2 && i < prog.length -2) ? 
                <div style={{display: 'flex', 'flex-direction': 'column', width: '100px'}}>
                    <Button onClick={(e) => setActiveDay(i)}>{dateFormat(days[i])}</Button>
                    {
                    Object.keys(prog[i]).map((_, j) => 
                        <Popover content={content(i,j)}>
                            <Button style={{background: color2(i,j)}} onClick={(e) => handleProgClick(i,j)}> </Button>
                        </Popover>
                    )}
                </div> : <div/>
            )
            }
        </div>
        }
        </>
    )
};

export default Progress;