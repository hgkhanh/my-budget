import { TEXT_COLOR } from "constants/typography";


const DiffAmount = ({ amount }: { amount: number }) => {
  let color: string = TEXT_COLOR.dark;
  let absoluteAmount = Math.abs(amount);
  let prefix = '▼';
  if (amount > 0) {
    color = TEXT_COLOR.red;
    prefix = '▲';
  } else if (amount < 0) {
    color = TEXT_COLOR.green;
  }
  return (
    <span style={{color: color}}>
      {prefix}{
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(absoluteAmount)
      }
    </span>
  )
}

export default DiffAmount;
