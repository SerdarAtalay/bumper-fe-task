import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import BuInput from "@/components/BuInput";
import BuButton from "@/components/BuButton";
import BuCheckBox from "@/components/BuCheckBox";
import BuCheckBoxGroup from "@/components/BuCheckBoxGroup";
import validationSchema from "@/lib/validationSchema";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import { PlusIcon } from "@heroicons/react/24/solid";
import BuHeader from "@/components/BuHeader";

export default function FormPage() {
    const router = useRouter();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    
    const form = useForm({
        defaultValues: {
          name: "",
          company: "",
          mobile_phone: "",
          email_address: "",
          postcode: "",
          pay_later: false,
          pay_now: false,
        },
        onSubmit: async ({ value }) => {
          // Ödeme seçimi kontrolü
          if (!value.pay_later && !value.pay_now) {
            setPaymentError("Lütfen en az bir ödeme seçeneği seçin");
            return;
          }
          
          setPaymentError(null);
          
          try {
            const response = await fetch("/api/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(value),
            });
      
            if (response.ok) {
              //alert("Form submitted successfully.");
              form.reset();
              router.push('/list');
            } else {
              alert("Failed to submit the form. Please try again.");
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit the form. Please try again.");
          }
        },
      });

  const checkPaymentOptions = () => {
    const payLater = form.getFieldValue('pay_later');
    const payNow = form.getFieldValue('pay_now');
    if (payLater || payNow) {
      setPaymentError(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#5A698C]">
      <BuHeader/>
      <div className="w-full max-w-4xl mx-auto py-10 px-6">
        <div className="flex flex-col gap-5 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Join our network</h1>
          <p className="text-white mb-4">Offer PayLater to split servicing and repair work into monthly instalments - interest-free. Use PayNow to take secure payments online.</p>
          
          <div className="bg-white p-6 md:p-12 rounded-3xl border border-[#1B1B1B] shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Join our network</h2>
              <p className="text-gray-700">Free to join, no monthly fees</p>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
              <form.Field name="name" validators={{ onChange: validationSchema.name }}>
                {(field) => <BuInput label="Name" field={field as AnyFieldApi} />}
              </form.Field>

              <form.Field
                name="company"
                validators={{ onChange: validationSchema.company }}
              >
                {(field) => <BuInput label="Company" field={field as AnyFieldApi} />}
              </form.Field>

              <form.Field
                name="mobile_phone"
                validators={{ onChange: validationSchema.mobile_phone }}
              >
                {(field) => (
                  <BuInput label="Mobile phone number" field={field as AnyFieldApi} />
                )}
              </form.Field>

              <form.Field
                name="email_address"
                validators={{ onChange: validationSchema.email_address }}
              >
                {(field) => (
                  <BuInput label="Email address" field={field as AnyFieldApi} />
                )}
              </form.Field>

              <form.Field
                name="postcode"
                validators={{ onChange: validationSchema.postcode }}
              >
                {(field) => <BuInput label="Postcode" field={field as AnyFieldApi} />}
              </form.Field>

              <BuCheckBoxGroup 
                label="Which payment methods do you prefer?" 
                description="Please select the services you want to use for payment."
                error={paymentError || undefined}
              >
                <form.Field name="pay_later">
                  {(field) => (
                    <BuCheckBox 
                      label="PayLater" 
                      field={field as AnyFieldApi} 
                      error={paymentError || undefined}
                      onChange={() => checkPaymentOptions()}
                      icon={<PlusIcon className="w-4 h-4" />}
                    />
                  )}
                </form.Field>

                <form.Field name="pay_now">
                  {(field) => (
                    <BuCheckBox 
                      label="PayNow" 
                      field={field as AnyFieldApi}
                      error={paymentError || undefined}
                      onChange={() => checkPaymentOptions()}
                      icon={<PlusIcon className="w-4 h-4" />}  
                    />
                  )}
                </form.Field>
              </BuCheckBoxGroup>

              <div>
                <BuButton 
                  type="submit" 
                  fullWidth={true}
                  icon={<ArrowRightIcon className="w-5 h-5" />}
                  className="bg-[#32BE50] border-[#1B1B1B]"
                >
                  Register
                </BuButton>
                <p className="text-center text-sm mt-6">
                  Already registered?{" "}
                  <span className="text-[#32BE50] ">Login</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}