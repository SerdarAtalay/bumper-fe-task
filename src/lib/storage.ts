export type Submission = { //it is typeScript after all, not interfaceScript
    name: string;
    company: string;
    mobile_phone: string;
    email_address: string;
    postcode: string;
    pay_later: boolean;
    pay_now: boolean;
  };
  
  const submissions: Submission[] = [];
  
  export function getSubmissions() {
    return submissions;
  }
  
  export function addSubmission(data: Submission) {
    submissions.push(data);
    return data;
  }