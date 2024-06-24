'use client';

import React, { useState } from 'react';
import useGetPrices from '@/app/Hook/useGetPrices';
import Image from "next/image";
import { PriceState } from '@/app/Model/Prices';
import { Processing } from '@/app/Components/Atoms';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MenuItem from '@mui/material/MenuItem';
import { Button, TextField, Select, InputLabel, FormControl } from '@mui/material';
import { SwapResult } from './Components/Molecules';
import PaymentPerPeriodResult from './Components/Molecules/PaymentPerPeriodResult';

const Home = () => {
  const { data: prices, isLoading } = useGetPrices();

  const [paymentA, setPaymentA] = useState<any>(null);
  const [paymentB, setPaymentB] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);

  if (isLoading) return <Processing />;

  return <section>
    <Formik
      initialValues={{
        principalA: '',
        interestRateA: '',
        principalB: '',
        interestRateB: '',
        periods: ''
      }}
      validationSchema={Yup.object().shape({
        principalA: Yup.number().typeError('Amount must be a number').required('Required'),
        principalB: Yup.number().typeError('Amount must be a number').required('Required'),
        interestRateA: Yup.string().required('Required'),
        interestRateB: Yup.string().required('Required'),
        periods: Yup.number().typeError('Periods must be a number').required('Required')
      })
      }
      onSubmit={values => {
        const principalAValue = parseFloat(values.principalA);
        const interestRateAValue = parseFloat(values.interestRateA);
        const principalBValue = parseFloat(values.principalB);
        const interestRateBValue = parseFloat(values.interestRateB);
        const periodsValue = parseInt(values.periods, 10);

        const paymentAPerPeriod = (principalAValue * interestRateAValue) / periodsValue;
        const paymentBPerPeriod = (principalBValue * interestRateBValue) / periodsValue;

        setPaymentA(paymentAPerPeriod.toFixed(2));
        setPaymentB(paymentBPerPeriod.toFixed(2));

        const totalPaymentA = principalAValue * interestRateAValue;
        const totalPaymentB = principalBValue * interestRateBValue;

        const swapSummary = {
          principalA: principalAValue,
          interestRateA: interestRateAValue,
          principalB: principalBValue,
          interestRateB: interestRateBValue,
          totalPaymentA: totalPaymentA.toFixed(2),
          totalPaymentB: totalPaymentB.toFixed(2),
          paymentAPerPeriod: paymentAPerPeriod.toFixed(2),
          paymentBPerPeriod: paymentBPerPeriod.toFixed(2),
          periods: periodsValue,
        };

        setSummary(swapSummary);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <ul className='mb-6'>
            <li>*If the page is stuck in loading, please wait a minute and refresh the application (F5) because the problem may come from fetching an unstable API</li>
            <li>*This application has a responsive layout</li>
          </ul>
          <h1 className="mb-6 font-bold">Currency Swap Calculator</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormControl fullWidth>
              <InputLabel id="interestRate-a-label">Currency for Company A</InputLabel>
              <Select
                labelId="interestRate-a-label"
                id="interestRate-a"
                value={values.interestRateA}
                label="Currency for Company A"
                onChange={(event: any) => { setFieldValue('interestRateA', event.target.value) }}
              >
                {
                  prices && prices.length > 0 && prices.map((x: PriceState, index: number) => {
                    return (
                      //@ts-ignore
                      <MenuItem key={index} value={x.price}>
                        <div className="flex">
                          <Image
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/7fe18e7feb5831bdd52b258e11e5a7064847ff09/tokens/${x.currency}.svg`} alt={x.currency}
                            width="20"
                            height="20"
                          />
                          <div className="ml-1">{x.currency}</div>
                        </div>
                      </MenuItem>
                    );
                  })
                }
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Principal Amount for Company A"
                placeholder="Enter amount for Company A"
                size="small"
                fullWidth
                name="principalA"
                error={Boolean(touched.principalA && errors.principalA,)}
                helperText={touched.principalA && errors.principalA}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.principalA}
              />
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormControl fullWidth>
              <InputLabel id="interestRate-b-label">Currency for Company B</InputLabel>
              <Select
                labelId="interestRate-b-label"
                id="interestRate-b"
                value={values.interestRateB}
                label="Currency for Company B"
                onChange={(event: any) => { setFieldValue('interestRateB', event.target.value) }}
              >
                {
                  prices && prices.length > 0 && prices.map((x: PriceState, index: number) => {
                    return (
                      //@ts-ignore
                      <MenuItem key={index} value={x.price}>
                        <div className="flex">
                          <Image
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/7fe18e7feb5831bdd52b258e11e5a7064847ff09/tokens/${x.currency}.svg`} alt={x.currency}
                            width="20"
                            height="20"
                          />
                          <div className="ml-1">{x.currency}</div>
                        </div>
                      </MenuItem>
                    );
                  })
                }
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Principal Amount for Company B"
                placeholder="Enter amount for Company B"
                size="small"
                fullWidth
                name="principalB"
                error={Boolean(touched.principalB && errors.principalB,)}
                helperText={touched.principalB && errors.principalB}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.principalB}
              />
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormControl fullWidth>
              <TextField
                label="Number of Payment Periods"
                placeholder="Enter number of Payment Periods"
                size="small"
                fullWidth
                name="periods"
                error={Boolean(touched.periods && errors.periods,)}
                helperText={touched.periods && errors.periods}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.periods}
              />
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button type="submit" variant="contained">Swap</Button>
          </div>
        </form>
      )}
    </Formik>
    {paymentA !== null && paymentB !== null && <PaymentPerPeriodResult paymentA={paymentA} paymentB={paymentB} />}
    {summary && <SwapResult summary={summary} />}
  </section>;
};

export default Home;