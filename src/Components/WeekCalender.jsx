import React, { useEffect } from 'react'
import getDatesRange from '../Helpers/getDatesRange';
import getWeek from '../Helpers/getWeek';

const WeekCalender = ({weeknum}) => {

let initialweeknum = getWeek();
if(weeknum) initialweeknum = weeknum;
let {rangeIsFrom, rangeIsTo} = getDatesRange(initialweeknum);

useEffect(()=>{

    try {
        let getWeekDayEvents = async ()=>{

            const res = await Promise.all([
                axios.get("http://calapi.inadiutorium.cz/api/v0/en/calendars/default/2015/6/26"),
                axios.get("http://calapi.inadiutorium.cz/api/v0/en/calendars/default/2015/6/27"),
                axios.get("http://calapi.inadiutorium.cz/api/v0/en/calendars/default/2015/6/28")
              ]);
              const data = res.map((res) => res.data);
              console.log(data.flat(), "the dataaa issss");
        }
    } catch (error) {
        console.log(error);
        
    }

},[])


  return (
    <></>
  )
}

export default WeekCalender