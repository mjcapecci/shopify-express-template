import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';

type HomeProps = {
  test: string;
};

const Home = ({ test }: HomeProps): JSX.Element => {
  const shopContext = useContext(ShopContext);

  return <button>{shopContext.shop.name}</button>;
};

export default Home;
