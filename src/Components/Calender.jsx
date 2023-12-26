import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import getDatesRange from "../Helpers/getDatesRange";
import WeekCalender from "./WeekCalender";
const DaysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DaysNum = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
const months = {
  0: "january",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "Septemeber",
  9: "October",
  10: "November",
  11: "Decemeber",
};

const PrevButton = ({ setCalMonth, setCalYear, calMonth }) => {
  const handleClick = () => {
    if (calMonth == 0) {
      setCalMonth(11);
      setCalYear((curr) => curr - 1);
    } else {
      setCalMonth((curr) => curr - 1);
    }
  };
  return (
    <button
      className="bg-stone-100 px-2 py-2 text-xl rounded shadow"
      onClick={handleClick}
    >
      &lt;
    </button>
  );
};

const NextButton = ({ setCalMonth, setCalYear, calMonth }) => {
  const handleClick = () => {
    if (calMonth == 11) {
      setCalMonth(0);
      setCalYear((curr) => curr + 1);
    } else {
      setCalMonth((curr) => curr + 1);
    }
  };
  return (
    <button
      className="bg-stone-100 px-2 py-2 text-xl rounded shadow"
      onClick={handleClick}
    >
      &gt;
    </button>
  );
};

const Calender = () => {
  const [prefixDays, setPrefixDays] = useState(null);
  const [suffixDays, setSuffixDays] = useState(null);
  const [calenderData, SetcalenderData] = useState([]);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [istodayclicked, setIsTodayClicked] = useState(false);
  const [isMonthView, setIsmonthView] = useState(true)

  useEffect(() => {
    const getCalenderData = async () => {
      try {
        if (istodayclicked) {
          setCalYear(new Date().getFullYear());
          setCalMonth(new Date().getMonth());
          setIsTodayClicked((curr) => !curr);
        }
        let actualmonth = calMonth + 1;
        console.log(actualmonth, "daaaaa");

        const fetchedCalenderData = await axios.get(
          `http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${calYear}/${actualmonth}`
        );

        SetcalenderData(fetchedCalenderData.data);
        let compPrefixDays = DaysNum[fetchedCalenderData.data[0].weekday];

        let compSuffixDays =
          6 -
          DaysNum[
            fetchedCalenderData.data[fetchedCalenderData.data.length - 1]
              .weekday
          ];

        setPrefixDays(compPrefixDays);
        setSuffixDays(compSuffixDays);
      } catch (error) {
        console.log(error);
      }
    };
    getCalenderData();
  }, [calYear, calMonth, istodayclicked]);

  const handleTodayClicked = () => {
    setIsTodayClicked((curr) => !curr);
  };
  return (
    <>
      <section className=" flex space-x-4 justify-center items-center h-full">
        <article className="bg-white w-1/3 h-2/3">
          <div
            className="flex  h-16 flex
    justify-between px-8 py-4"
          >
            <div>
              <PrevButton
                setCalMonth={setCalMonth}
                setCalYear={setCalYear}
                calMonth={calMonth}
              />{" "}
              <NextButton
                setCalMonth={setCalMonth}
                setCalYear={setCalYear}
                calMonth={calMonth}
              />
              <button
                className="bg-stone-100 px-2 py-2 text-xl rounded shadow"
                onClick={handleTodayClicked}
              >
                {" "}
                Today
              </button>{" "}
            </div>
            <div>
              {" "}
              <h1>
                {calYear}{" "}
                {months[new Date(`${calYear}-${calMonth + 1}-01`).getMonth()]}
              </h1>
            </div>
            <div>
              <button className={`bg-stone-100 px-2 py-2 text-xl rounded shadow ${!isMonthView && "bg-stone-900"}`}
              onClick={()=>setIsmonthView(true)}>
                {" "}
                Month
              </button>{" "}
              <button className="bg-stone-100 px-2 py-2 text-xl rounded shadow" onClick={()=>setIsmonthView(false)}>
                {" "}
                Week
              </button>{" "}
            </div>
          </div>

          <div className="flex px-4 justify-between">
            {DaysArr.map((day, index) => (
              <div key={index} className="  px-4 py-2 text-lg text-gray-500">
                {day}
              </div>
            ))}
          </div>
          {/* / <div className="flex"> </div> */}

          {/* mapping the dates */}
         { isMonthView? <div className="grid grid-cols-7 px-4">
            {Array.from({ length: prefixDays }).map((_, index) => (
              <div key={index} className=" px-4 py-2 text-lg text-white ">
                null
              </div>
            ))}

            {calenderData.map((day, index) => (
              <div
                key={index}
                className=" bg-stone-100 text-lg text-gray-500 border text-center ps-2 py-4"
              >
                <p
                  className={`${
                    new Date().getDate() === index + 1 &&
                    "bg-blue-500 text-white rounded-xl"
                  } mx-4`}
                >
                  {" "}
                  {index + 1}
                </p>
              </div>
            ))}

            {Array.from({ length: suffixDays }).map((_, index) => (
              <div key={index} className="text-lg text-white">
                null
              </div>
            ))}
          </div>: <WeekCalender/>}
        </article>

        <article className="bg-white w-96 h-2/3 overflow-auto">
          {calenderData.map((data, index) => (
            <div className="border-b-2 px-4 mb-3">
              <h1 className="">
                {new Date(data.date).getDate()}{" "}
                {DaysArr[new Date(data.date).getDay()]}{" "}
                {new Date(data.date).getFullYear()}
              </h1>
              <ul>
                {data.celebrations.map((item, index) => (
                  <li className="flex  items-center">
                    {item?.colour === "violet" && (
                      <span className="text-sm mr-2">
                        <FaCircle color="violet" />
                      </span>
                    )}
                    {item?.colour === "green" && (
                      <span className="text-sm mr-2">
                        <FaRegCircle color="green" />
                      </span>
                    )}
                    {item?.colour === "white" && (
                      <span className="text-sm mr-2">
                        <FaRegCircle color="gray" />
                      </span>
                    )}

                    <p>{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default Calender;
