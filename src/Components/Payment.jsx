import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';
import { AuthContext } from './Authentication';
import { useQuery } from '@tanstack/react-query';

const stripePromise = loadStripe('pk_test_51QjcgOCOpFZSKvwEUU1RfdvkSHDKxWddqu5tNYI69Y4wTWNForkeUrIPhe0fvRmoTb1s2kMAJsTDChJYeZbe9J4c00AEZPvpLR');

const Payment = () => {
  const { id } = useParams();
  const axiosMyBackend = useMyBackendAxios();
  const { user } = useContext(AuthContext);

  const { isPending, data: session = {} } = useQuery({
    queryKey: ['price_count', id],
    queryFn: async () => {
      const res = await axiosMyBackend.get(`/sessions/${id}`);
      return res.data;
    }
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm session={session} />
    </Elements>
  );
};

export default Payment;
