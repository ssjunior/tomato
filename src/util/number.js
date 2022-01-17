export const formatNumber = (number) => {}

export const formatCurrency = (value, currency='BRL') => {

    let currencyStr = currency ? 'R$': ''

    let number = parseFloat(value || 0).toFixed(2).replace(
        '.', ','
    ).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

    number = currencyStr ? `${currencyStr} ${number}` : number
    return number 
}

