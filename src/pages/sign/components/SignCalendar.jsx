
import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './SignCalendar.css';

const SignCalendar = (props) => {
    const { markers } = props;
    const [date, setDate] = useState(new Date());
    return (
        <Calendar 
            defaultView='month' 
            maxDate={new Date()} 
            minDetail='month'
            tileClassName={({date, view}) => {
                console.log(moment(date).format("DD-MM-YYYY"))
                console.log(markers)
                if (markers.find(x=>x===moment(date).format("DD-MM-YYYY"))) {
                    console.log('founded')
                    return "calendar-signed"
                }
            }}
            onChange={setDate} 
            value={date} />   
    )
}

export default SignCalendar