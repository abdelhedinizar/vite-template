import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { dayjs } from '@/lib/dayjs';
import { useUser } from '@/hooks/use-user';
import { MessageAdd } from '@/components/dashboard/chat/message-add';
import { MessageBox } from '@/components/dashboard/chat/message-box';
import { ThreadToolbar } from '@/components/dashboard/chat/thread-toolbar';
import { useFetchMessages } from '@/hooks/use-assistance';

export function Page() {
    const { messages, loading, error } = useFetchMessages();
  const { user } = useUser();

  const messages1 = [
    {
      id: 'MSG-011',
      threadId: 'TRD-004',
      type: 'text',
      content: 'Hi, how are you?',
      author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      createdAt: dayjs().subtract(10, 'minute').toDate(),
    },
    {
      id: 'MSG-010',
      threadId: 'TRD-003',
      type: 'text',
      content: 'Are you available for a call?',
      author: { id: 'USR-005', name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
      createdAt: dayjs().subtract(5, 'minute').subtract(1, 'hour').toDate(),
    },
    {
      id: 'MSG-009',
      threadId: 'TRD-002',
      type: 'text',
      content: 'Hello everyone 😀',
      author: { id: 'USR-001', name: 'Miron Vitold', avatar: '/assets/avatar-1.png' },
      createdAt: dayjs().subtract(56, 'minute').subtract(2, 'hour').toDate(),
    },
    {
      id: 'MSG-008',
      threadId: 'TRD-002',
      type: 'text',
      content: 'Hi!',
      author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      createdAt: dayjs().subtract(51, 'minute').subtract(3, 'hour').toDate(),
    },
    {
      id: 'MSG-007',
      threadId: 'TRD-002',
      type: 'text',
      content: 'Hey, would you like to collaborate?',
      author: { id: 'USR-007', name: 'Nasimiyu Danai', avatar: '/assets/avatar-7.png' },
      createdAt: dayjs().subtract(46, 'minute').subtract(5, 'hour').toDate(),
    },
    {
      id: 'MSG-006',
      threadId: 'TRD-001',
      type: 'image',
      content: '/assets/image-abstract-1.png',
      author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
      createdAt: dayjs().subtract(1, 'hour').subtract(2, 'day').toDate(),
    },
    {
      id: 'MSG-005',
      threadId: 'TRD-001',
      type: 'text',
      content: 'Ok, I will think about it. Thanks!',
      author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
      createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
    },
    {
      id: 'MSG-004',
      threadId: 'TRD-001',
      type: 'text',
      content: "I'm sorry, I can't go lower than $45.",
      author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
    },
    {
      id: 'MSG-003',
      threadId: 'TRD-001',
      type: 'text',
      content: "Can't you make it $40? I'm on a tight budget.",
      author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
      createdAt: dayjs().subtract(5, 'hour').subtract(3, 'day').toDate(),
    },
    {
      id: 'MSG-002',
      threadId: 'TRD-001',
      type: 'text',
      content: 'Sure, it is $50 per hour.',
      author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      createdAt: dayjs().subtract(2, 'hour').subtract(4, 'day').toDate(),
    },
    {
      id: 'MSG-001',
      threadId: 'TRD-001',
      type: 'text',
      content: "I'm interested in your services, can you tell me more about your hourly rate?",
      author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
      createdAt: dayjs().subtract(5, 'hour').subtract(4, 'day').toDate(),
    },
  ];

  const thread = {
    id: 'TRD-004',
    type: 'direct',
    participants: [
      { id: user.id, name: user.firstname, avatar: user.avatar },
      { id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' },
    ],
    unreadCount: 0,
  };

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <ThreadToolbar thread={thread} />
      <Stack spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Stack>
      <MessageAdd />
    </Box>
  );
}
