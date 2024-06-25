import { numberWithCommas } from '@/app/Utils/general';
interface Props {
    paymentA: number,
    paymentB: number
}

const PaymentPerPeriodResult = (props: Props) => {
    const { paymentA, paymentB } = props

    return (

        <div className="mb-6">
            <h3 className="font-bold">Payment per Period</h3>
            <p>Company A: {numberWithCommas(paymentA)} per period</p>
            <p>Company B: {numberWithCommas(paymentB)} per period</p>
        </div>
    )
}

export default PaymentPerPeriodResult