import React, { useState } from "react"
import DateFnsUtils from "@date-io/date-fns"
import plLocale from "date-fns/locale/pl"
import enLocale from "date-fns/locale/en-US"
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

  return (
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
    </MuiPickersUtilsProvider>
  )
}
