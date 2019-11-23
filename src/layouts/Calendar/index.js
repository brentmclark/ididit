import React from 'react';
import Calendar from 'react-calendar'
import {
    Drawer
} from '@material-ui/core'
import TaskList from '../../primatives/TaskList'

export default function CalendarLayout(props) {
    const [date, setDate] = React.useState(null)
    const [showDrawer, setShowDrawer] = React.useState(false)

    function handleCalendarChange(date) {
        setDate(date)
        setShowDrawer(true)
    } 

    return (
        <>
            <h1>Calendar</h1>
            <Calendar
                onChange={handleCalendarChange}
                value={date}
            />
            <Drawer open={showDrawer} anchor="right" onClose={() => setShowDrawer(false)}>
                <TaskList />
            </Drawer>
        </>
    )
}