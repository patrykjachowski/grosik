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
import {Button} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import {ArrowBack} from "@material-ui/icons";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";

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
        <div style={{ 'textAlign': 'center' }}>
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
            </MuiPickersUtilsProvider>
            <ButtonGroup disableElevation variant="contained" color="primary" style={{'marginTop':'20px'}}>
                <Button onClick={setPrevMonth}>
                    <ArrowLeftIcon />
                </Button>
                <Button onClick={setNextMonth}>
                    <ArrowRightIcon/>
                </Button>
            </ButtonGroup>
        </div>
    )
}
