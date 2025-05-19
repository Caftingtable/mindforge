import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';
import { AuthContext } from './Authentication';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ session }) => {
  const { price } = session;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const axiosPrivate = useMyBackendAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(price) > 0) {
      axiosPrivate.post('/create-payment-intent', { amount: parseInt(price) * 100 }).then(res => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosPrivate, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment confirmation failed');
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const value = {
        student_email: user.email,
        session_id: session._id,
        tutor_email: session.tutor_email,
        tutor_name: session.tutor_name,
        classEnd: session.classEnd,
        classStart: session.classStart,
        reg_end_date: session.reg_end_date,
        reg_start_date: session.reg_start_date,
        description: session.description,
        price: session.price,
        session_duration: session.session_duration,
        session_title: session.session_title,
        cover_img: session.cover_img,
        paymentId: paymentIntent.id,
        payment_amount: paymentIntent.amount,
        payment_status: paymentIntent.status,
        status: 'booked'
      };

      axiosPrivate.post('/bookings', value).then(res => {
        if (res.data.insertedId || res.data.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Booked Session',
            showConfirmButton: false,
            timer: 2000
          });
          navigate('/dashboard/view_booked_session');
        }
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-6 rounded-lg shadow-md bg-white"
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/stripe.svg"
            alt="Stripe"
            className="w-10 h-10"
          />
        </div>

        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Payment with Stripe
        </h2>

        <div className="mb-4">
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div id="card-element" className="p-3 border border-gray-300 rounded-lg shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full text-white bg-primary px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          Pay
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
