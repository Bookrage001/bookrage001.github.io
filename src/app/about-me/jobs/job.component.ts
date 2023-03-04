import { Component, Input } from '@angular/core';

export interface JobComponent {
  role: string,
  company: string,
  startMonth?: string,
  startYear: string,
  endMonth?: string,
  endYear: string,
  description: string,
  tags?: Array<string>;
}
