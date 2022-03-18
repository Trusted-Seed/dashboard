import { CalendarIcon } from 'components/icons/CalendarIcon';
import { DiscordIcon } from 'components/icons/DiscordIcon';
import { MediumIcon } from 'components/icons/MediumIcon';
import { TelegramIcon } from 'components/icons/TelegramIcon';
import { TwitterIcon } from 'components/icons/TwitterIcon';
import { YoutubeIcon } from 'components/icons/YoutubeIcon';

export enum IconType {
  TELEGRAM = 'telegram',
  TWITTER = 'twitter',
  DISCORD = 'discord',
  MEDIUM = 'medium',
  CALENDAR = 'calendar',
  YOUTUBE = 'youtube',
}

export const ICONS: Record<IconType, JSX.Element> = {
  telegram: <TelegramIcon />,
  twitter: <TwitterIcon />,
  discord: <DiscordIcon />,
  medium: <MediumIcon />,
  calendar: <CalendarIcon />,
  youtube: <YoutubeIcon />,
} as const;

export type LinkType = {
  label: string;
  iconType: IconType;
  url: string;
};
