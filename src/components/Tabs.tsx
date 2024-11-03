const tabItems = [
    { id: 1, label: "Pomodoro", value: "pomodoro" },
    { id: 2, label: "short break", value: "short-break" },
    { id: 3, label: "long break", value: "long-break" }
]

type AppProps = {
    currentTab: string,
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}
const Tabs = ({ currentTab, setCurrentTab }: AppProps) => {
    return (
        <ul className='max-w-md mx-auto flex justify-between items-center bg-primary py-3 px-5 rounded-full'>
            {
                tabItems.map(({ label, value, id }) =>
                    <li key={id} className={`capitalize py-2 px-4 rounded-full font-medium cursor-pointer ${currentTab === value ? 'bg-button-color' : 'text-foreground'}`} onClick={() => setCurrentTab(value)}>{label}</li>
                )
            }
        </ul>
    )
}

export default Tabs