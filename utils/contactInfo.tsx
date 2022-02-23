import { CalendarIcon } from 'components/icons/CalendarIcon';
import { DiscordIcon } from 'components/icons/DiscordIcon';
import { MediumIcon } from 'components/icons/MediumIcon';
import { TelegramIcon } from 'components/icons/TelegramIcon';
import { TwitterIcon } from 'components/icons/TwitterIcon';

export const contactInfo = [
  {
    label: 'Telegram',
    icon: <TelegramIcon />,
    url: 'https://t.me/joinchat/HGrjjRS2PoowbH1ODuefuA',
  },
  {
    label: 'Twitter',
    icon: <TwitterIcon />,
    url: 'https://twitter.com/commonsstack',
  },
  {
    label: 'Discord',
    icon: <DiscordIcon />,
    url: 'http://discord.link/commonsstack',
  },
  {
    label: 'Medium',
    icon: <MediumIcon />,
    url: 'https://medium.com/commonsstack',
  },
  {
    label: 'Calendar',
    icon: <CalendarIcon />,
    url: '#',
  },
] as const;
