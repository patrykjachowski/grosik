import React, { useState } from "react"
import DateFnsUtils from "@date-io/date-fns"
import FORMAT from "date-fns/format"
import plLocale from "date-fns/locale/pl"
import enLocale from "date-fns/locale/en-US"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

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
      />
    </MuiPickersUtilsProvider>
  )
}
