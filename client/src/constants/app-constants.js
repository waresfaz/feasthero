// remember to keep these from lower values to higher values!
export const validBookingSizes = [
    { name: 'bookingSize', value: 5, label: 5 },
    { name: 'bookingSize', value: 6, label: 6 },
    { name: 'bookingSize', value: 7, label: 7 },
    { name: 'bookingSize', value: 8, label: 8 },
    { name: 'bookingSize', value: 9, label: 9 },
    { name: 'bookingSize', value: 10, label: 10 },
    { name: 'bookingSize', value: 11, label: 11 },
    { name: 'bookingSize', value: 12, label: 12 },
    { name: 'bookingSize', value: 13, label: 13 },
    { name: 'bookingSize', value: 14, label: 14 },
    { name: 'bookingSize', value: 15, label: 15 },
    { name: 'bookingSize', value: 16, label: 16 },
    { name: 'bookingSize', value: 17, label: 17 },
    { name: 'bookingSize', value: 18, label: 18 },
    { name: 'bookingSize', value: 19, label: 19 },
    { name: 'bookingSize', value: 20, label: 20 },
]

export const bookingSizeDropdownStyle = {
    control: (base, _) => ({
        ...base,
        boxShadow: 'none',
        borderRadius: '0.5rem',
        padding: '0.89rem 0',
        border: '1px solid #C7C8C8 !important'
    })
}

export const dateTimeBookingDropdownStyle = {
    control: (base, state) => ({
        ...base,
        boxShadow: 'none',
        borderRadius: '0.5rem',
        padding: '0.9rem 0',
        border: '1px solid #C7C8C8 !important'
    })
}