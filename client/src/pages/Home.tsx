import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { Page } from '@shopify/polaris';

type HomeProps = {
  test: string;
};

const Home = ({ test }: HomeProps): JSX.Element => {
  const shopContext = useContext(ShopContext);

  return (
    <Page>
      <div>{shopContext.shop.name}</div>
    </Page>
  );
};

export default Home;
