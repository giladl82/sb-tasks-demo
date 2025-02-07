import loader from '@assets/loader.json';
import Lottie from 'lottie-react';

export function Loader() {
  return (
    <div
      className="absolute top-[50%] left-[50%] w-32 -translate-[50%]"
      data-testid="loader"
      aria-label="Loading"
      aria-live='polite'
      role='status'
    >
      <Lottie animationData={loader} loop={true} />
    </div>
  );
}
