import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import Tabs from './Tabs'
import Clock from './Clock'
import { Gear } from 'react-bootstrap-icons'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ColorPicker, useColor } from "react-color-palette";
import "../../node_modules/react-color-palette/dist/css/rcp.css";
import { setContrastTextColor } from '../utlits/colorContrast';


const Display = () => {
    const ref = useRef<any>()
    const [currentTab, setCurrentTab] = useState('pomodoro')
    const [open, setOpen] = useState(false);
    const [colorPalettOpen, setColorPaleattOpen] = useState('')
    const [selectFont, setSelectFont] = useState('')
    const [backgroundColor, setBackgroundColor] = useColor("#1E2140");
    const [clockBackgroundColor, setClockBackgroundColor] = useColor("#151932");
    const [clockProgressColor, setClockProgressColor] = useColor("#F7706D");
    const [tabActiveColor, setTabActiveColor] = useColor("#F7706D");
    const [clockFontColor, setClockFontColor] = useColor("#F3F4F6");

    const [totalDuration, setTotalDuration] = useState(1500);
    const [shortDuration, setShortDuration] = useState(300);
    const [longDuration, setLongDuration] = useState(900);
    const [newValue, setNewValue] = useState(
        {
            pomodoro: 1500,
            shortTime: 300,
            longTime: 900
        }
    )

    //form submit
    const handleFromSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTotalDuration(newValue.pomodoro)
        setShortDuration(newValue.shortTime)
        setLongDuration(newValue.longTime)

        const bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.style.fontFamily = selectFont;
        }

        document.documentElement.style.setProperty('--background', `${backgroundColor.hex}`);
        document.documentElement.style.setProperty('--primary', `${clockBackgroundColor.hex}`);
        document.documentElement.style.setProperty('--secondary', `${clockProgressColor.hex}`);
        document.documentElement.style.setProperty('--foreground', `${clockFontColor.hex}`);
        document.documentElement.style.setProperty('--button-color', `${tabActiveColor.hex}`);

        const elements = document.querySelectorAll<HTMLElement>('.text-contrast');
        elements.forEach(setContrastTextColor);
        setColorPaleattOpen('')
        setOpen(false)
    }

    // change the timmer default value
    const hangleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const name = e.target.name
        setNewValue({ ...newValue, [name]: value * 60 })
    }

    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>('.text-contrast');
        elements.forEach(setContrastTextColor);
        console.log(elements)

        // const handleClick = (e: MouseEvent) => {
        //     if (ref.current && !ref.current.contains(e.target)) {
        //         console.log(e.target)
        //         setColorPaleattOpen('');
        //     }
        // };
        // document.addEventListener('click', handleClick);

        // return () => {
        //     document.removeEventListener('click', handleClick);
        // };
    }, []);

    return (
        <div>
            <h3 className='pt-16 pb-10 text-center text-3xl font-bold text-contrast'>Pomodoro</h3>
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {
                currentTab === 'pomodoro' && <Clock totalDuration={totalDuration} />
            }
            {
                currentTab === 'short-break' && <Clock totalDuration={shortDuration} />
            }
            {
                currentTab === 'long-break' && <Clock totalDuration={longDuration} />
            }
            <div className='flex justify-center mt-10'>
                <Gear size={25} className='text-foreground text-center cursor-pointer text-contrast' onClick={() => setOpen(true)} />
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                classNames={{
                    modal: 'px-20 py-20',
                    closeIcon: 'w-4 h-4'
                }}
            >
                <form action="" className='mt-5' onSubmit={handleFromSubmit}>
                    <div className='flex gap-4'>
                        <label htmlFor="pomodoro">
                            <span className='font-semibold capitalize'>Pomodoro</span>
                            <input type="number" name="pomodoro" defaultValue={totalDuration / 60} id="pomodoro" onChange={hangleValueChange} className='block border py-0.5 px-2 max-w-24 mt-1 outline-slate-100' />
                            <span className='text-gray-500 text-sm'>minutes</span>
                        </label>
                        <label htmlFor="short">
                            <span className='font-semibold capitalize'>short time</span>
                            <input type="number" name="shortTime" defaultValue={shortDuration / 60} id="short" onChange={hangleValueChange} className='block border py-0.5 px-2 max-w-24 mt-1 outline-slate-100' />
                            <span className='text-gray-500 text-sm'>minutes</span>
                        </label>
                        <label htmlFor="long">
                            <span className='font-semibold capitalize'>long time</span>
                            <input type="number" name="longTime" defaultValue={longDuration / 60} id="long" onChange={hangleValueChange} className='block border py-0.5 px-2 max-w-24 mt-1 outline-slate-100' />
                            <span className='text-gray-500 text-sm'>minutes</span>
                        </label>
                    </div>
                    <div className='mt-5'>
                        <div ref={ref}>
                            <p className='font-semibold'>Color</p>
                            <select name="" id="" onChange={(e) => { e.stopPropagation(); setColorPaleattOpen(e.target.value) }} className='border px-2 py-2 outline-none w-full'>
                                <option value="">Select Color</option>
                                <option value="background-color">Background</option>
                                <option value="clock-background-color">Tab And Clock Background</option>
                                <option value="clock-font-color">Tab And Clock Text</option>
                                <option value="clock-progress-color">Clock Progress</option>
                                <option value="tab-active-color">Tab Active Color</option>
                            </select>
                            {colorPalettOpen === 'background-color' && <div > <ColorPicker color={backgroundColor} onChange={setBackgroundColor} /></div>}
                            {colorPalettOpen === 'clock-background-color' && <ColorPicker color={clockBackgroundColor} onChange={setClockBackgroundColor} />}
                            {colorPalettOpen === 'clock-progress-color' && <ColorPicker color={clockProgressColor} onChange={setClockProgressColor} />}
                            {colorPalettOpen === 'clock-font-color' && <ColorPicker color={clockFontColor} onChange={setClockFontColor} />}
                            {colorPalettOpen === 'tab-active-color' && <ColorPicker color={tabActiveColor} onChange={setTabActiveColor} />}

                        </div>
                        <div className='mt-5'>
                            <p className='font-semibold'>Font Family</p>
                            <select name="" id="" onChange={(e) => setSelectFont(e.target.value)} className='border px-2 py-2 outline-none w-full'>
                                <option value="">Select Font</option>
                                <option value="'Roboto', sans-serif">Roboto</option>
                                <option value="'Inter', serif">Inter</option>
                                <option value="'Work Sans', serif">Work Sans</option>
                                <option value="'Roboto', sans-serif">Roboto</option>
                                <option value="'Itim', cursive">Itim</option>
                                <option value="'Montserrat', sans-serif">Montserrat</option>
                                <option value="'Raleway', sans-serif">Raleway</option>
                                <option value="'Lora', serif">Lora</option>
                                <option value="'Lora', sans-serif">IBM Plex Sans</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button type='submit' className='bg-[#1E2140] text-white/70 px-5 py-2 rounded-full'>Save Change</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Display
