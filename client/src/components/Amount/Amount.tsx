import { TEXT_COLOR } from "constants/typography";


const Amount = ({ amount }: {amount: number}) => {
  let color: string = TEXT_COLOR.dark;
  if (amount > 0) {
    color = TEXT_COLOR.green;
  } else if (amount < 0) {
    color = TEXT_COLOR.red;
  }
  return (<span style={{color: color}}>{amount < 0 && "-"}€{Math.abs(amount)}</span>)
}

export default Amount;
