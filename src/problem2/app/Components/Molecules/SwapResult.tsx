import { numberWithCommas } from '@/app/Utils/general';

const SwapResult = (props: any) => {
    const { summary } = props

    return (
        <div>
            <h2 className="font-bold">Currency Swap Summary</h2>
            <p>Principal for Company A: {numberWithCommas(summary.principalA)}</p>
            <p>Interest Currency for Company A: {numberWithCommas(summary.interestRateA)}</p>
            <p>Principal for Company B: {numberWithCommas(summary.principalB)}</p>
            <p>Interest Currency for Company B: {numberWithCommas(summary.interestRateB)}</p>
            <p>Total Payment by Company A: {numberWithCommas(summary.totalPaymentA)}</p>
            <p>Total Payment by Company B: {numberWithCommas(summary.totalPaymentB)}</p>
            <p>Payment per Period for Company A: {numberWithCommas(summary.paymentAPerPeriod)}</p>
            <p>Payment per Period for Company B: {numberWithCommas(summary.paymentBPerPeriod)}</p>
            <p>Number of Periods: {numberWithCommas(summary.periods)}</p>
        </div>
    )
}

export default SwapResult