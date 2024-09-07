import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import { Category, LiveTv, NotificationAdd, Settings, Tv } from '@mui/icons-material';
export const SidebarData = [
  {
    title: "Dashboard",
    icon: <HomeRoundedIcon />,
    link: "/"
  },
  {
    title: "Lives",
    icon: <LiveTv/>,
    link: "/lives"
  },
  {
    title: "Categories",
    icon: <Category/>,
    link: "/categories"
  },
  {
    title:"Channels",
    icon : <Tv/>,
    link : "/channels"
  },
  {
    title: "Settings",
    icon : <Settings/>,
    link: "/config"
  },
  { title:"Notification",
    icon: <NotificationAdd/>,
    link: "/notification"
  },
  {
    title: "Admin pannel",
    icon: <AdminPanelSettingsRoundedIcon />,
    link: "/adminPannel",
    role: "admin"
  }
];
