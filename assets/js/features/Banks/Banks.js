import React from 'react'
import { useSelector } from 'react-redux'
import { selectBanks } from './banksSlice'

export default function Banks() {
    const banks = useSelector(selectBanks)

    return (
        <div>
            <h3>Konta bankowe</h3>
            <ul>
                {!banks
                    ? 'Loading bank accounts...'
                    : banks.map((bank) => (
                          <li key={bank['@id']}>
                              <div>
                                  {bank.name}: {bank.balance}
                              </div>
                          </li>
                      ))}
            </ul>
        </div>
    )
}
