import type { DocPageData } from '@/types/docs'

export default {
  title: 'Chat',
  description: 'Chat bubbles are used to show messages in a conversation. DuChat wraps DuChatItem elements and sets a default placement. Each DuChatItem supports named slots for image, header, message, and footer.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/chat/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuChatItem placement="start">Hello there!</DuChatItem>
  <DuChatItem placement="end" variant="primary">Hi! How are you?</DuChatItem>
</div>`,
      code: `<DuChat>
  <DuChatItem placement="start">Hello there!</DuChatItem>
  <DuChatItem placement="end" variant="primary">Hi! How are you?</DuChatItem>
</DuChat>`,
    },
    {
      title: 'With avatar and metadata',
      description: 'Use named slots (`#image`, `#header`, `#footer`) to add avatar, sender name, and delivery status.',
      preview: `<div class="flex flex-col gap-2 w-80">
  <DuChatItem placement="start">
    <template #image><img src="https://i.pravatar.cc/32?img=1" alt="Alice" /></template>
    <template #header>Alice <time class="text-xs opacity-50">12:45</time></template>
    <template #message>Can you send me the file?</template>
  </DuChatItem>
  <DuChatItem placement="end" variant="primary">
    <template #header>You <time class="text-xs opacity-50">12:46</time></template>
    <template #message>Sure, here it is!</template>
    <template #footer>Delivered</template>
  </DuChatItem>
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
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuChatItem placement="start" variant="info">Info message</DuChatItem>
  <DuChatItem placement="start" variant="success">Success message</DuChatItem>
  <DuChatItem placement="start" variant="warning">Warning message</DuChatItem>
  <DuChatItem placement="start" variant="error">Error message</DuChatItem>
</div>`,
      code: `<DuChat>
  <DuChatItem placement="start" variant="info">Info message</DuChatItem>
  <DuChatItem placement="start" variant="success">Success message</DuChatItem>
  <DuChatItem placement="start" variant="warning">Warning message</DuChatItem>
  <DuChatItem placement="start" variant="error">Error message</DuChatItem>
</DuChat>`,
    },
    {
      title: 'Dynamic items',
      description: 'Pass an `items` array to DuChat to render programmatically.',
      preview: `<DuChat
  :items="[
    { message: 'Hello!', placement: 'start' },
    { message: 'Hey, how are you?', placement: 'end', variant: 'primary' },
    { message: 'Doing great, thanks!', placement: 'start' },
  ]"
/>`,
      code: `<DuChat
  :items="[
    { message: 'Hello!', placement: 'start' },
    { message: 'Hey, how are you?', placement: 'end', variant: 'chat-bubble-primary' },
    { message: 'Doing great, thanks!', placement: 'start' },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
