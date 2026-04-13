import type { DocPageData } from '@/types/docs'

export default {
  title: 'Chat',
  description: 'Chat bubbles are used to show messages in a conversation.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/chat/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex flex-col gap-2 w-72">
  <div class="chat chat-start">
    <div class="chat-bubble">Hello there!</div>
  </div>
  <div class="chat chat-end">
    <div class="chat-bubble chat-bubble-primary">Hi! How are you?</div>
  </div>
</div>`,
      code: `<DuChat>
  <DuChatItem side="start">Hello there!</DuChatItem>
  <DuChatItem side="end" variant="primary">Hi! How are you?</DuChatItem>
</DuChat>`,
    },
    {
      title: 'With avatar and metadata',
      code: `<DuChat>
  <DuChatItem
    side="start"
    avatar="https://i.pravatar.cc/32"
    name="Alice"
    time="12:45"
  >
    Can you send me the file?
  </DuChatItem>
  <DuChatItem
    side="end"
    name="You"
    time="12:46"
    variant="primary"
    :footer="{ text: 'Delivered', status: 'delivered' }"
  >
    Sure, here it is!
  </DuChatItem>
</DuChat>`,
    },
    {
      title: 'Bubble variants',
      code: `<DuChat>
  <DuChatItem side="start" variant="info">Info message</DuChatItem>
  <DuChatItem side="start" variant="success">Success message</DuChatItem>
  <DuChatItem side="start" variant="warning">Warning message</DuChatItem>
  <DuChatItem side="start" variant="error">Error message</DuChatItem>
</DuChat>`,
    },
  ],
} satisfies DocPageData
