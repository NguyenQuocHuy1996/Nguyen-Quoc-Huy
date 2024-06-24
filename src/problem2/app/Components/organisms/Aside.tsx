'use client';
import Image from "next/image";
import useGetPrices from '@/app/Hook/useGetPrices';
import { PriceState } from '@/app/Model/Prices';
import { Processing } from '@/app/Components/Atoms';

const Aside = () => {
    const { data: prices, isError, isLoading } = useGetPrices();

    if (isLoading) return <Processing />;

    return <aside>
        <h2 className="mb-6 font-bold">Currency List</h2>
        <ul>
            {
                prices?.map((item: PriceState, index: number) => {
                    return <li key={index} className="text-black flex item-stretch">
                        <Image
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/7fe18e7feb5831bdd52b258e11e5a7064847ff09/tokens/${item.currency}.svg`} alt={item.currency}
                            width="20"
                            height="20"
                        />
                        <div className="ml-2"><b>{item.currency}</b>: {item.price}</div>
                    </li>
                })
            }
        </ul>
    </aside>
}

export default Aside;