import { getSellerProducts } from '@/actions';
import { Dashboard } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대시보드 | 판매자센터',
};

const dashboardPage = async () => {
  const { data, list } = await getSellerProducts();

  return <Dashboard data={data!} list={list ? list : []} />;
};

export default dashboardPage;
