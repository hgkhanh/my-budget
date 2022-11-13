import { TEXT_COLOR } from "constants/typography";


const Amount = ({ amount }: {amount: number}) => {
  let color: string = TEXT_COLOR.dark;
  if (amount > 0) {
    color = TEXT_COLOR.green;
  } else if (amount < 0) {
    color = TEXT_COLOR.red;
  }
  return (
    <span style={{color: color}}>
      {
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount)
      }
    </span>
  )
}

export default Amount;
