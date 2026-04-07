// ...existing code...

export interface JobInterface {
  role: string,
  company: string,
  startDate: Date,
  endDate?: Date,
  description: string[],
  businessDescription?: string[],
  softwareDescription?: string[],
  tags?: Array<string>;
  techTags?: Array<string>;
}
