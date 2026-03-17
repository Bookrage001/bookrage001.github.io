// ...existing code...

export interface JobInterface {
  role: string,
  company: string,
  startDate: Date,
  endDate?: Date,
  description: string[],
  tags?: Array<string>;
}
