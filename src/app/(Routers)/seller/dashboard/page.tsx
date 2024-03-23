import { getSellerProducts } from '@/actions';
import { Dashboard } from '@/containers';

const dashboardPage = async () => {
  const { data, list } = await getSellerProducts();

  return <Dashboard data={data!} list={list ? list : []} />;
};

export default dashboardPage;
