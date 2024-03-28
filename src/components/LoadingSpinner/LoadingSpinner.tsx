import Image from 'next/image';

export const LoadingSpinner = () => {
  return (
    <div className="container">
      <div className="loading-container">
        <Image src={'/assets/spinner.svg'} width={50} height={50} alt="loading..." />
      </div>
    </div>
  );
};
