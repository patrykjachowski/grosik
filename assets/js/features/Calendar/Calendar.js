import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import plLocale from 'date-fns/locale/pl'
import enLocale from 'date-fns/locale/en-US'
import isBefore from 'date-fns/isBefore'
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import Input from '@material-ui/core/Input'
import { useDispatch, useSelector } from 'react-redux'
import { selectDate, setDate } from './calendarSlice'

export default () => {
    const calendarDate = useSelector(selectDate)
    const dispatch = useDispatch()
    const calendarMaxDateLimit = new Date().setUTCFullYear(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        1
    )

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
    )

    const setPrevMonth = () => {
        const prevMonthDate = new Date(calendarDate).setMonth(
            new Date(calendarDate).getMonth() - 1
        )
        dispatch(setDate(prevMonthDate))
    }

    const setNextMonth = () => {
        const calendarDateCopy = new Date(calendarDate)
        const nextMonthDate = new Date(calendarDate).setUTCFullYear(
            calendarDateCopy.getFullYear(),
            calendarDateCopy.getMonth() + 1,
            1
        )
        if (isBefore(calendarDate, calendarMaxDateLimit))
            dispatch(setDate(nextMonthDate))
    }

    return (
        <div style={{ display: 'flex' }}>
            <button onClick={setPrevMonth}> {'<'} </button>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <DatePicker
                    views={['year', 'month']}
                    minDate={new Date(2019, 1, 1, 0, 0, 0, 0)}
                    maxDate={new Date()}
                    value={new Date(calendarDate)}
                    onChange={() => {}}
                    format={'MMM yyyy'}
                    openTo="month"
                    TextFieldComponent={renderInput}
                    inputProps={{
                        style: {
                            fontSize: '30px',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            textAlign: 'center',
                        },
                    }}
                />
                <button onClick={setNextMonth}> {'>'} </button>
            </MuiPickersUtilsProvider>
        </div>
    )
}
