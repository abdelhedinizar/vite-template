'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { ShoppingCart as BasketIcon } from '@phosphor-icons/react/dist/ssr';
import { ChatsCircle as ChatsCircleIcon } from '@phosphor-icons/react/dist/ssr/ChatsCircle';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useDialog } from '@/hooks/use-dialog';
import { usePopover } from '@/hooks/use-popover';
import { useUser } from '@/hooks/use-user';

import { ContactsPopover } from '../contacts-popover';
import { languageFlags, LanguagePopover } from '../language-popover';
import { MobileNav } from '../mobile-nav';
import { NotificationsPopover } from '../notifications-popover';
import { SearchDialog } from '../search-dialog';
import { UserPopover } from '../user-popover/user-popover';

export function MainNav({ items }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useUser();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          '--MainNav-background': 'var(--mui-palette-background-default)',
          '--MainNav-divider': 'var(--mui-palette-divider)',
          bgcolor: 'var(--MainNav-background)',
          left: 0,
          position: 'sticky',
          pt: { lg: 'var(--Layout-gap)' },
          top: 0,
          width: '100%',
          zIndex: 'var(--MainNav-zIndex)',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid var(--MainNav-divider)',
            display: 'flex',
            flex: '1 1 auto',
            minHeight: 'var(--MainNav-height)',
            px: { xs: 2, lg: 3 },
            py: 1,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            { /* <SearchButton />  */}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flex: '1 1 auto', justifyContent: 'flex-end' }}
          >
            <BasketButton />

            { user?.role === 'admin' && <ChatButton /> }
            <Divider
              flexItem
              orientation="vertical"
              sx={{ borderColor: 'var(--MainNav-divider)', display: { xs: 'none', lg: 'block' } }}
            />
            <LanguageSwitch />
            <UserButton user={user} />
          </Stack>
        </Box>
      </Box>
      <MobileNav
        items={items}
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

function SearchButton() {
  const dialog = useDialog();

  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton onClick={dialog.handleOpen} sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
          <MagnifyingGlassIcon />
        </IconButton>
      </Tooltip>
      <SearchDialog onClose={dialog.handleClose} open={dialog.open} />
    </React.Fragment>
  );
}

function ContactsButton() {
  const popover = usePopover();

  return (
    <React.Fragment>
      <Tooltip title="Contacts">
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <UsersIcon />
        </IconButton>
      </Tooltip>
      <ContactsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function ChatButton() {
  const popover = usePopover();
  const navigate = useNavigate();

  const openChatBot = () => {
    navigate('/dashboard/waiter');
  };
  return (
    <React.Fragment>
      <Tooltip title="ChatBot">
        <IconButton onClick={() => openChatBot()} ref={popover.anchorRef}>
          <ChatsCircleIcon />
        </IconButton>
      </Tooltip>
      <ContactsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function BasketButton() {
  const popover = usePopover();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.basket);
  const openBasketDetail = () => {
    navigate('/dashboard/basket/detail');
  };

  return (
    <React.Fragment>
      <Tooltip title="Basket">
        <Badge color="error" badgeContent={items.length} sx={{ top: '3px' }} max={9}>
          <IconButton onClick={() => openBasketDetail()} ref={popover.anchorRef}>
            <BasketIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <NotificationsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const popover = usePopover();
  const language = 'fr'; //i18n.language || 'fr';
  const flag = languageFlags[language];

  return (
    <React.Fragment>
      <Tooltip title="Language">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
        >
          <Box sx={{ height: '24px', width: '24px' }}>
            <Box alt={language} component="img" src={flag} sx={{ height: 'auto', width: '100%' }} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function UserButton({ user }) {
  const popover = usePopover();

  // If user is null or undefined, don't render the component
  if (!user) {
    return null;
  }

  return (
    <React.Fragment>
      <Box
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
        >
          <Avatar src={user?.avatar} />
        </Badge>
      </Box>
      <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} user={user} />
    </React.Fragment>
  );
}
