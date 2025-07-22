// def exchange_conversion(from_curr,to_curr,amount):
//         url='https://api.currencylayer.com/convert'
//         params={
//             'access_key':'3263fca29bbc7eae94c823b8ee2cb213',
//             'from':from_curr,
//             'to':to_curr,
//             'amount':amount

//         }
//         res=requests.get(url=url,params=params)

//         return res.json()

export const exchangeConversion = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  const params = new URLSearchParams({
    access_key: "3263fca29bbc7eae94c823b8ee2cb213",
    from: fromCurrency,
    to: toCurrency,
    amount: amount.toString(),
  });
  const url = `https://api.currencylayer.com/convert?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
