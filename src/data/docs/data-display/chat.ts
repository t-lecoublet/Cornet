import type { DocPageData } from '@/types/docs'

export default {
  title: 'Chat',
  description: 'Chat bubbles are used to show messages in a conversation. DuChat wraps DuChatItem elements (manual mode) or accepts an `items` array (dynamic mode). DuChatItem uses named slots: `#image`, `#header`, `#message`, `#footer`.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/chat/',
  props: [
    {
      title: 'items',
      description: 'Array of chat message objects with message, placement, variant, image, header, footer, and customClass',
      type: 'ChatItem[]',
    },
    {
      title: 'placement',
      description: 'Default message placement when not specified on items',
      type: 'string',
      default: '"start"',
      options: ['start', 'end'],
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes for all chat items',
      type: 'string',
    },
  ],
  slots: [
    {
      title: 'Item slots on DuChat (#image-{n}, #header-{n}, #message-{n}, #footer-{n})',
      description: 'Customize individual messages when using the `items` prop. Slot exposes `{ item, index }`.',
      preview: `<div class="flex flex-col gap-2">
  <DuChat
    :items="[
      { message: 'Hello!', placement: 'start', image: 'https://i.pravatar.cc/32?img=1' },
      { message: 'Hey!', placement: 'end', variant: 'primary' },
    ]"
  >
    <template #header-0="{ item }">
      <span class="font-semibold text-sm">Alice</span>
      <time class="text-xs opacity-50 ml-1">12:45</time>
    </template>
    <template #message-0="{ item }">
      <span class="text-blue-600 font-medium">{{ item.message }}</span>
    </template>
    <template #footer-1>
      <time class="text-xs opacity-50">Delivered</time>
    </template>
  </DuChat>
</div>`,
      code: `<DuChat :items="messages">
  <template #header-0="{ item }">
    <span class="font-semibold">Alice</span>
  </template>
  <template #message-0="{ item }">
    <span class="text-primary">{{ item.message }}</span>
  </template>
  <template #footer-1>
    <time class="text-xs opacity-50">Delivered</time>
  </template>
</DuChat>`,
    },
    {
      title: 'Item slots on DuChatItem (#image, #header, #message, #footer)',
      description: 'When using DuChatItem directly (manual mode), use its own named slots for each part of the bubble.',
      preview: `<DuChat>
  <DuChatItem placement="start">
    <template #image>
      <img src="https://i.pravatar.cc/32?img=1" alt="Alice" />
    </template>
    <template #header>
      Alice <time class="text-xs opacity-50 ml-1">12:45</time>
    </template>
    <template #message>Can you send me the file?</template>
    <template #footer>Seen</template>
  </DuChatItem>
</DuChat>`,
      code: `<DuChat>
  <DuChatItem placement="start">
    <template #image>
      <img :src="user.avatar" :alt="user.name" />
    </template>
    <template #header>{{ user.name }}</template>
    <template #message>{{ message.text }}</template>
    <template #footer>{{ message.status }}</template>
  </DuChatItem>
</DuChat>`,
    },
  ],
  sections: [
    {
      title: 'Basic (items prop)',
      description: 'Pass an `items` array to `DuChat` — the simplest way to render a conversation.',
      preview: `<div class="flex flex-col gap-2">
  <DuChat
    :items="[
      { message: 'Hello there!', placement: 'start' },
      { message: 'Hi! How are you?', placement: 'end', variant: 'primary' },
      { message: 'Doing great, thanks!', placement: 'start' },
    ]"
  />
</div>`,
      code: `<DuChat
  :items="[
    { message: 'Hello there!', placement: 'start' },
    { message: 'Hi! How are you?', placement: 'end', variant: 'primary' },
    { message: 'Doing great, thanks!', placement: 'start' },
  ]"
/>`,
    },
    {
      title: 'Manual mode (DuChatItem)',
      description: 'Use `DuChatItem` directly inside `DuChat`. Content goes into the `#message` named slot — the default slot has no effect.',
      preview: `<div class="flex flex-col gap-2">
  <DuChat>
    <DuChatItem placement="start">
      <template #message>Hello there!</template>
    </DuChatItem>
    <DuChatItem placement="end" variant="primary">
      <template #message>Hi! How are you?</template>
    </DuChatItem>
  </DuChat>
</div>`,
      code: `<DuChat>
  <DuChatItem placement="start">
    <template #message>Hello there!</template>
  </DuChatItem>
  <DuChatItem placement="end" variant="primary">
    <template #message>Hi! How are you?</template>
  </DuChatItem>
</DuChat>`,
    },
    {
      title: 'With avatar and metadata',
      description: 'Use `#image`, `#header`, and `#footer` slots on DuChatItem for rich messages.',
      preview: `<div class="flex flex-col gap-2">
  <DuChat>
    <DuChatItem placement="start">
      <template #image>
        <img src="https://i.pravatar.cc/32?img=1" alt="Alice" />
      </template>
      <template #header>Alice <time class="text-xs opacity-50 ml-1">12:45</time></template>
      <template #message>Can you send me the file?</template>
    </DuChatItem>
    <DuChatItem placement="end" variant="primary">
      <template #header>You <time class="text-xs opacity-50 ml-1">12:46</time></template>
      <template #message>Sure, here it is!</template>
      <template #footer>Delivered</template>
    </DuChatItem>
  </DuChat>
</div>`,
      code: `<DuChat>
  <DuChatItem placement="start">
    <template #image>
      <img src="https://i.pravatar.cc/32" alt="Alice" />
    </template>
    <template #header>Alice <time class="text-xs opacity-50">12:45</time></template>
    <template #message>Can you send me the file?</template>
  </DuChatItem>

  <DuChatItem placement="end" variant="primary">
    <template #header>You <time class="text-xs opacity-50">12:46</time></template>
    <template #message>Sure, here it is!</template>
    <template #footer>Delivered</template>
  </DuChatItem>
</DuChat>`,
    },
    {
      title: 'Bubble variants',
      description: 'Use `variant` on DuChatItem or in the items array to color the bubble.',
      preview: `<div class="flex flex-col gap-2">
  <DuChat>
    <DuChatItem placement="start" variant="info">
      <template #message>Info message</template>
    </DuChatItem>
    <DuChatItem placement="start" variant="success">
      <template #message>Success message</template>
    </DuChatItem>
    <DuChatItem placement="start" variant="warning">
      <template #message>Warning message</template>
    </DuChatItem>
    <DuChatItem placement="start" variant="error">
      <template #message>Error message</template>
    </DuChatItem>
  </DuChat>
</div>`,
      code: `<DuChat>
  <DuChatItem placement="start" variant="info">
    <template #message>Info message</template>
  </DuChatItem>
  <DuChatItem placement="start" variant="success">
    <template #message>Success message</template>
  </DuChatItem>
  <DuChatItem placement="start" variant="warning">
    <template #message>Warning message</template>
  </DuChatItem>
  <DuChatItem placement="start" variant="error">
    <template #message>Error message</template>
  </DuChatItem>
</DuChat>`,
    },
    {
      title: 'Dynamic items with image, header and footer',
      description: 'The `items` prop supports `image`, `header`, `footer`, and `variant` on each message.',
      preview: `<div class="flex flex-col gap-2">
  <DuChat
    :items="[
      {
        message: 'Can you send me the file?',
        placement: 'start',
        image: 'https://i.pravatar.cc/32?img=1',
        header: 'Alice',
        footer: 'Delivered',
      },
      {
        message: 'Sure, here it is!',
        placement: 'end',
        variant: 'primary',
        header: 'You',
        footer: 'Seen',
      },
    ]"
  />
</div>`,
      code: `<DuChat
  :items="[
    {
      message: 'Can you send me the file?',
      placement: 'start',
      image: avatarUrl,
      header: 'Alice',
      footer: 'Delivered',
    },
    {
      message: 'Sure, here it is!',
      placement: 'end',
      variant: 'primary',
      header: 'You',
      footer: 'Seen',
    },
  ]"
/>`,
    },
    {
      title: 'With custom slots on DuChat (#header-{n})',
      description: 'Override specific message parts when using the `items` prop.',
      links: [
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
      ],
      preview: `<div class="flex flex-col gap-2">
  <DuChat
    :items="[
      { message: 'Message with custom slot', placement: 'start', image: 'https://i.pravatar.cc/32?img=1' },
      { message: 'Another message', placement: 'end', image: 'https://i.pravatar.cc/32?img=2' },
    ]"
  >
    <template #header-0="{ item }">
      <div class="flex items-center gap-2">
        <span>User</span>
        <DuBadge variant="primary" size="sm">Online</DuBadge>
      </div>
    </template>
    <template #footer-0>
      <time class="text-xs opacity-50">12:45</time>
    </template>
  </DuChat>
</div>`,
      code: `<DuChat :items="messages">
  <template #header-0="{ item }">
    <div class="flex items-center gap-2">
      <span>{{ item.header }}</span>
      <DuBadge variant="primary" size="sm">Online</DuBadge>
    </div>
  </template>
  <template #footer-0>
    <time class="text-xs opacity-50">12:45</time>
  </template>
</DuChat>`,
    },
  ],
} satisfies DocPageData
