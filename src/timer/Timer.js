import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./style.css";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
const Timer=()=>{

    const [seconds, setSeconds] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsActive(false);
        setIsPaused(true);
    };

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(false);
        setSeconds(0);
        setInitialSeconds(0);
    };

    const handleChange = (event) => {
        const inputSeconds = parseInt(event.target.value);
        setInitialSeconds(inputSeconds);
        setSeconds(inputSeconds);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return(
        <>
            <div className="container">
                <input
                    type="number"
                    value={initialSeconds}
                    onChange={handleChange}
                    placeholder="Введи кількість секунд"
                />
                <React.Fragment>
                    <CssBaseline/>
                    <Container maxWidth="sm">
                        <Box sx={{bgcolor: '#cfe8fc', height: '100px'}}>
                            <h2>{formatTime(seconds)}</h2>
                        </Box>

                    </Container>
                </React.Fragment>

                <div className="buttons">
                    <Stack direction="row" spacing={2}>
                        <Button onClick={handleStart} variant="contained" color="success">
                            Старт
                        </Button>
                        <Button color="secondary" onClick={handlePause}>Пауза</Button>
                        <Button variant="outlined" color="error" onClick={handleStop}>
                            Стоп
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default Timer;