export function numberWithCommas(x: number) {
    return x ? x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : x;
}