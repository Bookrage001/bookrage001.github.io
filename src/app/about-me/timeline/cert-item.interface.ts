export interface CertItem {
  name: string;
  issuer?: string;
  issuedDate?: Date;
  expiryDate?: Date;
  notes?: string[];
}
