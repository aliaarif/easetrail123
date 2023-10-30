<script setup>
import { Razorpay } from 'razorpay'
    const  initializeRazorpay = async () => {
    const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
        amount: 100, // Amount in paise (100 paise = 1 INR)
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Payment for your service',
        handler: async (response) => {
        // Handle payment success response here
        console.log('Payment Success:', response);
        },
        prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
}
</script>
<template>
    <div>
      <!-- Your payment form fields here -->
      <button @click="initializeRazorpay">Pay with Razorpay</button>
    </div>
  </template>
  
  
  