import React, { useState } from "react"
import DateFnsUtils from "@date-io/date-fns"
import plLocale from "date-fns/locale/pl"
import enLocale from "date-fns/locale/en-US"
import isBefore from 'date-fns/isBefore'
import {DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";

const localeMap = {
  en: enLocale,
  pl: plLocale,
}

const localeFormatMap = {
  en: "MMMM, yyyy",
  pl: "MMM yyyy",
}

export default () => {
  const [locale, setLocale] = useState("pl")
  const [maxMonthDate] = useState(new Date().setMonth(new Date().getMonth() + 1))

  const [selectedDate, handleDateChange] = useState(new Date())

  const renderInput = (props) => (
      <Input
          type="text"
          inputRef={props.inputRef}
          inputProps={props.inputProps}
          value={props.value}
          onClick={props.onClick}
          onChange={props.onChange}
          endAdornment={props.InputProps.endAdornment}
      />
  );
  
  const setPrevMonth = () => {
      const prevMonthDate =  new Date(new Date(selectedDate).setMonth(selectedDate.getMonth() - 1))
      handleDateChange(prevMonthDate)
  }

    const setNextMonth = () => {
        const selectedDateCopy = new Date(selectedDate)
        const nextMonthDate = new Date(selectedDateCopy.setMonth(selectedDate.getMonth() + 1))
        if (isBefore(selectedDate, maxMonthDate )) handleDateChange(nextMonthDate)
    }

  return (
    <div style={{'display':'flex'}}>
        <button
            onClick={setPrevMonth}
        > {'<'} </button>
        <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={localeMap[locale]}
      >

        <DatePicker
          views={["year", "month"]}
          minDate={new Date(2019, 1, 1, 0, 0, 0, 0)}
          maxDate={new Date()}
          value={selectedDate}
          onChange={handleDateChange}
          format={localeFormatMap[locale]}
          openTo="month"
          TextFieldComponent={renderInput}
          inputProps={{style:{fontSize: '30px', textTransform:'uppercase', letterSpacing: '3px', textAlign: 'center'}}}
        />
        <button
            onClick={setNextMonth}
        > {'>'} </button>
      </MuiPickersUtilsProvider>
    </div>
  )
}
