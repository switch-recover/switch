export const shortenAddress = (address: string, length?: number): string => {
    return `${address.slice(0, length ? length : 5)}...${address.slice(-1 * (length ? length - 1 : 4))}`
}
