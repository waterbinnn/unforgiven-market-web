import Image from 'next/image';

export default function Loading() {
  return (
    <div className="loading-container">
      <Image src={'/assets/spinner.svg'} width={50} height={50} alt="loading..." />
    </div>
  );
}
