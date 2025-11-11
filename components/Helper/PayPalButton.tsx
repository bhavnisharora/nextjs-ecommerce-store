import React from "react";
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

interface PayPalOrderDetails {
  id: string;
  status: string;
  payer: {
    name?: { given_name?: string; surname?: string };
    email_address?: string;
  };
  purchase_units: {
    amount: {
      currency_code: string;
      value: string;
    };
  }[];
}

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: PayPalOrderDetails) => void;
}

const PayPalButton = ({ amount, onSuccess }: PayPalButtonProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then((details) => {
            onSuccess(details as PayPalOrderDetails);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
