/***
 * 
 * Please read the Readme file for a more in-depth review
 * 
 */

import React, { useMemo } from 'react'; // Import useMemo hook into the component
import { WalletRow } from './WalletRow'; // Assuming WalletRow is another component.
import { BoxProps } from '@mui/system'; // Assuming BoxProps is imported from MUI system.

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Assuming blockchain field is part of WalletBalance
}

interface FormattedWalletBalance extends WalletBalance { // Using inheritance
  formatted: string;
}

interface Props extends BoxProps {} // Makes the code cleaner

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props; // Remove children as it's not used
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => { // Declare string for blockchain for type clarity instead of using any
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa': // return case value reused
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  const rows = sortedAndFormattedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Assuming currency is unique, else use another unique identifier
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};