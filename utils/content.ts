import { attributes as aboutAttributes } from 'content/about.md';
import { attributes as dashboardAttributes } from 'content/dashboard.md';
import { attributes as faqAttributes } from 'content/faq.md';
import { attributes as landingAttributes } from 'content/landing.md';
import { attributes as membersAttributes } from 'content/members.md';
import { attributes as signAttributes } from 'content/sign.md';

export const ATTRIBUTES = Object.freeze({
  about: aboutAttributes,
  dashboard: dashboardAttributes,
  faq: faqAttributes,
  landing: landingAttributes,
  members: membersAttributes,
  sign: signAttributes,
});

export type SlugType = keyof typeof ATTRIBUTES;

export const slugs = Object.keys(ATTRIBUTES);
