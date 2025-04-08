import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import BuInput from "@/components/BuInput";
import validationSchema from "@/lib/validationSchema";

export default function FormPage() {
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
          try {
            const response = await fetch("/api/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(value),
            });
      
            if (response.ok) {
              alert("Form başarıyla gönderildi!");
              form.reset();
            } else {
              alert("Form gönderilirken hata oluştu.");
            }
          } catch (error) {
            console.error("Form gönderimi hatası:", error);
            alert("Form gönderilirken bir hata oluştu.");
          }
        },
        validators: {
          onSubmit: validationSchema.formLevel,
        },
      });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="p-6 space-y-4 max-w-md mx-auto"
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

      <form.Field name="pay_later">
        {(field) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            <span>PayLater</span>
          </label>
        )}
      </form.Field>

      <form.Field name="pay_now">
        {(field) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            <span>PayNow</span>
          </label>
        )}
      </form.Field>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Register
      </button>
    </form>
  );
}
