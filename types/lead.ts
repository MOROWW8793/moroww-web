export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  property_description?: string;
  region?: string;
  source?: string;
}

export interface LeadFormState {
  success: boolean;
  error?: string;
}
