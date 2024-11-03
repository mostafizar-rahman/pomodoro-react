import { memo, useEffect, useState } from 'react'
type PropsType = {
    totalDuration: number
}
const Clock = ({ totalDuration }: PropsType) => {
    const [isPlay, setIsPlay] = useState(false)
    const [remainingTime, setRemainingTime] = useState(totalDuration);
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isPlay) {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevTime - 1;
                });
                setProgressValue((prevProgress) => {
                    if (prevProgress >= totalDuration) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevProgress + 1;
                });
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isPlay, totalDuration]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const progressPercentage = (progressValue / totalDuration) * 100;

    const progress = {
        background: `radial-gradient(closest-side, var(--primary) 95%, transparent 80% 100%), conic-gradient(var(--secondary) ${progressPercentage}%, var(--primary) 0)`,
        transition: 'background 1s linear'
    };

    return (
        <>
            <div className='w-[350px] h-[350px] mx-auto mt-10 bg-background flex justify-center items-center rounded-full shadow-[0_20px_40px_rgba(79,_84,_137,_1)]'>
                <div style={progress} className='w-[300px] h-[300px] rounded-full flex justify-center items-center flex-col round-border'>
                    <h5 className='text-foreground text-[85px] font-bold'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h5>
                    <p onClick={() => setIsPlay(!isPlay)} className='text-foreground text-2xl uppercase mt-0 cursor-pointer font-medium tracking-[6px]'>{isPlay ? 'push' : 'play'}</p>
                </div>
            </div>
        </>
    )
}

export default memo(Clock) 