import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./ProgressBar.css"

export const ProgressBar = ({index, activeIndex, duration}) => {
    const isActive = index === activeIndex;
    const [progress, setProgress] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if(prev < 100) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev
            })

        },duration/100)
    }, [duration, activeIndex])

    useEffect(() => {
        setProgress(0);
    }, [activeIndex])

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
        <div className={`${isActive ? "progress-bar" : ""}`} style={{width: `${progress}%`}}>

        </div>
    </div>
  )
}
