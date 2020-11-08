import React from 'react';
import {render} from '@testing-library/react'
import Transactions from '../components/Transactions'

test('<Transactions />', () => {
    const {debug} = render(<Transactions/>)

    debug()
})


