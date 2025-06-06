<script setup lang="ts">
const {
  $checkout, $errors, months, store, errorStore, years, onSubmit, setFieldError,
} = useCheckout()
</script>

<template>
  <section
    aria-labelledby="payment-heading"
    class="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
  >
    <h2
      id="payment-heading"
      class="sr-only"
    >
      Payment and shipping details
    </h2>

    <div class="mx-auto max-w-lg lg:pt-16">
      <UForm
        id="checkoutForm"
        class="mt-6"
        :state="store"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-12 gap-x-4 gap-y-6">
          <div class="col-span-full sm:col-span-6">
            <UFormField
              :error="errorStore.firstName?.message"
              label="First Name"
              name="cc-given-name"
              required
            >
              <UInput
                id="firstName"
                autocomplete="cc-given-name"
                class="w-full"
                :model-value="store.firstName"
                size="xl"
                type="text"
                @update:model-value="(val) => $checkout.setKey('firstName', val as string)"
              />
            </UFormField>
          </div>

          <div class="col-span-full sm:col-span-6">
            <UFormField
              :error="errorStore.lastName?.message"
              label="Last Name"
              name="cc-family-name"
              required
            >
              <UInput
                id="lastName"
                autocomplete="cc-family-name"
                class="w-full"
                :model-value="store.lastName"
                type="text"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('lastName', val as string)"
              />
            </UFormField>
          </div>

          <div class="col-span-full">
            <UFormField
              :error="errorStore.cc?.message"
              label="Credit Card"
              name="cc-number"
              required
            >
              <UInput
                id="cc"
                autocomplete="cc-number"
                class="w-full"
                placeholder="4111-1111-1111-1111 will validate"
                type="text"
                size="xl"
                :model-value="store.cc"
                @input="(e: Event) => {
                  const val = handleInputFormat({
                    target: e.target as HTMLInputElement,
                    formatter: formatCard,
                  });

                  $errors.setKey('cc', undefined)
                  $checkout.setKey('cc', val as string)
                }"
                @blur="(e: Event) => {
                  const err = validateCC((e.target as HTMLInputElement).value || '')
                  if (err) {
                    setFieldError('cc', err.message)
                  }
                }"
              />
            </UFormField>
          </div>

          <div class="col-span-4">
            <UFormField
              :error="errorStore.month?.message"
              label="Month"
              name="cc-exp-month"
              type="item"
              required
            >
              <USelect
                class="w-full"
                autocomplete="cc-exp-month"
                :default-value="store.month"
                :model-value="store.month"
                :items="months"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('month', val)"
              />
            </UFormField>
          </div>

          <div class="col-span-4">
            <UFormField
              :error="errorStore.year?.message"
              label="Year"
              name="cc-exp-year"
              required
            >
              <USelect
                autocomplete="cc-exp-year"
                class="w-full"
                :default-value="store.year"
                :model-value="store.year"
                :items="years"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('year', val)"
              />
            </UFormField>
          </div>

          <div class="col-span-4">
            <UFormField
              :error="errorStore.cvv?.message"
              label="CVV"
              name="cc-csc"
              required
            >
              <UInput
                id="cvv"
                autocomplete="cc-csc"
                class="w-full"
                :model-value="store.cvv"
                type="text"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('cvv', val as string)"
              />
            </UFormField>
          </div>

          <div class="col-span-full">
            <UFormField
              :error="errorStore.email?.message"
              label="Email"
              name="email"
              required
            >
              <UInput
                id="email"
                class="w-full"
                type="text"
                :model-value="store.email"
                placeholder="you@example.com"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('email', val as string)"
              />
            </UFormField>
          </div>
        </div>

        <div class="mt-6">
          <UFormField
            :error="errorStore.acceptedTerms?.message"
            name="terms"
            required
          >
            <UCheckbox
              id="terms"
              :default-value="store.acceptedTerms"
              :model-value="store.acceptedTerms"
              label="I agree to the terms"
              size="xl"
              @update:model-value="(val) => $checkout.setKey('acceptedTerms', val as boolean)"
            />
          </UFormField>
        </div>

        <UButton
          class="mt-6"
          type="submit"
          size="xl"
          title="Submit"
        >
          Submit
        </UButton>
      </UForm>
    </div>
  </section>
</template>
