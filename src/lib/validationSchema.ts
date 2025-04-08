import type { Submission } from "./storage";
const validationSchema = {
  name: ({ value }: { value: string }) => {
    if (!value) return 'Name is required';
    if (value.length > 255) return 'Name must be at most 255 characters';
    return undefined;
  },
  company: ({ value }: { value: string }) => {
    if (!value) return 'Company is required';
    if (value.length > 255) return 'Company must be at most 255 characters';
    return undefined;
  },
  mobile_phone: ({ value }: { value: string }) => {
    if (!value) return 'Mobile phone number is required';
    if (!/^0\s*7\s*(\d\s*){9}$/.test(value)) return 'Invalid phone number';
    return undefined;
  },
  email_address: ({ value }: { value: string }) => {
    if (!value) return 'Email address is required';
    if (!/.+@.+\..+/.test(value)) return 'Invalid email address';
    return undefined;
  },
  postcode: ({ value }: { value: string }) => {
    if (!value) return 'Postcode is required';
    if (value.length > 30) return 'Postcode must be at most 30 characters';
    return undefined;
  },

  // Bu sadece tanımsal olarak burada durabilir ama aslında form-wide olarak kullanılacak:
  formLevel: ({ value }: { value: Submission }) => {
    if (!value.pay_now && !value.pay_later) {
      return 'Please select at least one payment option';
    }
    return undefined;
  }
};

export default validationSchema;