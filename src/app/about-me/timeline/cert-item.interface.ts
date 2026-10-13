export interface CertItem {
  name: string;
  issuer?: string;
  issuedDate?: Date;
  expiryDate?: Date;
  notes?: string[];
  // Formal qualifications (degrees, diplomas) are styled apart from certifications
  // and show only the completion year.
  kind?: 'certification' | 'qualification';
}
