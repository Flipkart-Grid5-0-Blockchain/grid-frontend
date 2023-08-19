// Recent Card Imports
import logo from '../assets/logo.png';

// Sidebar Data
export const SidebarData = [
  {
    icon: logo,
    heading: 'Dashboard',
  },
  {
    icon: logo,
    heading: 'Orders',
  },
  {
    icon: logo,
    heading: 'Customers',
  },
  {
    icon: logo,
    heading: 'Products',
  },
  {
    icon: logo,
    heading: 'Analytics',
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: 'Sales',
    color: {
      backGround: 'linear-gradient(rgb(99 152 237) 0%, rgb(165 192 250) 100%)',
      boxShadow: '0px 10px 20px 0px #e0c6f5',
    },
    barValue: 70,
    value: '25,970',
    png: logo,
    series: [
      {
        name: 'Sales',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: 'Revenue',
    color: {
      backGround: 'linear-gradient(rgb(235 238 72) 0%, rgb(234 241 175) 100%)',
      boxShadow: '0px 10px 20px 0px #FDC0C7',
    },
    barValue: 80,
    value: '14,270',
    png: logo,
    series: [
      {
        name: 'Revenue',
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: 'Expenses',
    color: {
      backGround:
        'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
      boxShadow: '0px 10px 20px 0px #F9D59B',
    },
    barValue: 60,
    value: '4,270',
    png: logo,
    series: [
      {
        name: 'Expenses',
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: logo,
    name: 'Andrew Thomas',
    noti: 'has ordered Apple smart watch 2500mh battery.',
    time: '25 seconds ago',
  },
  {
    img: logo,
    name: 'James Bond',
    noti: 'has received Samsung gadget for charging battery.',
    time: '30 minutes ago',
  },
  {
    img: logo,
    name: 'Iron Man',
    noti: 'has ordered Apple smart watch, samsung Gear 2500mh battery.',
    time: '2 hours ago',
  },
];
