<template>
  <div class="payment-container">
    <div class="payment-card">
      <h2>Payment Details</h2>
      
      <!-- Payment Form -->
      <form @submit.prevent="handleSubmit" class="payment-form">
        <!-- Card Details -->
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <input 
            type="text" 
            id="cardNumber" 
            v-model="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
            @input="formatCardNumber"
          >
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label for="expiryDate">Expiry Date</label>
            <input 
              type="text" 
              id="expiryDate" 
              v-model="expiryDate"
              placeholder="MM/YY"
              maxlength="5"
              @input="formatExpiryDate"
            >
          </div>
          <div class="form-group half">
            <label for="cvv">CVV</label>
            <input 
              type="text" 
              id="cvv" 
              v-model="cvv"
              placeholder="123"
              maxlength="3"
            >
          </div>
        </div>

        <!-- Coupon Section -->
        <div class="coupon-section">
          <div class="form-group">
            <label for="coupon">Coupon Code</label>
            <div class="coupon-input-group">
              <input 
                type="text" 
                id="coupon" 
                v-model="couponCode"
                placeholder="Enter coupon code"
                :disabled="couponApplied"
              >
              <button 
                type="button" 
                @click="applyCoupon" 
                class="coupon-button"
                :class="{ 'applied': couponApplied }"
              >
                {{ couponApplied ? 'Applied' : 'Apply' }}
              </button>
            </div>
          </div>
          <div v-if="couponMessage" :class="['coupon-message', couponMessageType]">
            {{ couponMessage }}
          </div>
        </div>

        <!-- Total Amount -->
        <div class="amount-section">
          <div class="amount-row">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div v-if="discount > 0" class="amount-row discount">
            <span>Discount:</span>
            <span>-${{ discount.toFixed(2) }}</span>
          </div>
          <div class="amount-row total">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button">
          Pay Now
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')
const couponCode = ref('')
const couponApplied = ref(false)
const couponMessage = ref('')
const couponMessageType = ref('')
const subtotal = ref(99.99) // Example amount
const discount = ref(0)

// Computed total amount
const total = computed(() => {
  return subtotal.value - discount.value
})

// Format card number with spaces
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '')
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{4})/g, '$1 ').trim()
  cardNumber.value = value
}

// Format expiry date
const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  expiryDate.value = value
}

// Apply coupon
const applyCoupon = () => {
  if (couponCode.value.toLowerCase() === 'ulmusburesvtc') {
    discount.value = subtotal.value // Set discount to full amount
    couponMessage.value = 'Coupon applied successfully!'
    couponMessageType.value = 'success'
    couponApplied.value = true
    
    // Redirect to success page after a short delay
    setTimeout(() => {
      router.push('/success')
    }, 1500)
  } else {
    couponMessage.value = 'Invalid coupon code'
    couponMessageType.value = 'error'
    couponApplied.value = false
    discount.value = 0
  }
}

// Handle form submission
const handleSubmit = () => {
  // Add your payment processing logic here
  console.log('Processing payment...')
}
</script>

<style scoped>
.payment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.payment-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.half {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.coupon-input-group {
  display: flex;
  gap: 10px;
}

.coupon-button {
  padding: 0 20px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.coupon-button:hover {
  background-color: #3182ce;
}

.coupon-button.applied {
  background-color: #48bb78;
}

.coupon-message {
  margin-top: 8px;
  font-size: 14px;
}

.coupon-message.success {
  color: #48bb78;
}

.coupon-message.error {
  color: #e53e3e;
}

.amount-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f7fafc;
  border-radius: 8px;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #4a5568;
}

.amount-row.discount {
  color: #48bb78;
}

.amount-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
  font-weight: bold;
  font-size: 1.1em;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #3182ce;
}

@media (max-width: 480px) {
  .payment-card {
    padding: 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 10px;
  }
}
</style>