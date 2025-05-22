import type { Meta, StoryObj } from "@storybook/vue3";
import DuChat from "./du-chat.vue";
import DuChatItem from "./du-chat-item.vue";
import DuBadge from "../du-badge/du-badge.vue";
import { DU_CHAT_PLACEMENTS } from "./du-chat.types";

const meta: Meta<typeof DuChat> = {
  title: "Components/DataDisplay/Chat",
  component: DuChat,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: "object",
      description:
        "Array of chat items with message, image, header, footer, placement and color properties",
    },
    placement: {
      control: { type: "select" },
      options: DU_CHAT_PLACEMENTS,
      description: "Default placement for chat bubbles",
    },
    customClass: {
      control: "text",
      description: "Custom class to apply to all chat elements",
    },
  },
  args: {
    items: [
      {
        message: "Hello! How can I help you today?",
        header: "Assistant",
        footer: "Sent at 10:00",
        placement: "start",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "I have a question about your customer service.",
        header: "You",
        footer: "Sent at 10:05",
        placement: "end",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message:
          "Of course, I would be happy to help with that. What is your question?",
        header: "Assistant",
        footer: "Sent at 10:07",
        placement: "start",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
    ],
    placement: "start",
    customClass: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithColors: Story = {
  args: {
    items: [
      {
        message: "Message with primary color",
        placement: "start",
        variant: "primary",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "Message with secondary color",
        placement: "end",
        variant: "secondary",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "Message with accent color",
        placement: "start",
        variant: "accent",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "Message with info color",
        placement: "end",
        variant: "info",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "Message with success color",
        placement: "start",
        variant: "success",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "Message with warning color",
        placement: "end",
        variant: "warning",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
      {
        message: "Message with error color",
        placement: "start",
        variant: "error",
        image:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      },
    ],
  },
};

export const WithCustomSlots: Story = {
  render: (args: any) => ({
    components: { DuChat, DuBadge },
    setup() {
      const items = [
        {
          message: "Message with custom slot",
          placement: "start",
          image:
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        },
        {
          message: "Another message with custom slot",
          placement: "end",
          image:
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        },
      ];

      return { items };
    },
    template: `
      <div class="flex flex-col gap-2">
        <DuChat :items="items">
          <template #header-0="{ item }">
            <div class="flex items-center gap-2">
              <span>User</span>
              <DuBadge variant="primary" size="sm">Online</DuBadge>
            </div>
          </template>
          <template #footer-0>
            <time class="text-xs opacity-50">12:45</time>
          </template>
          <template #header-1>
            <div class="flex items-center gap-2">
              <span>You</span>
              <DuBadge variant="success" size="sm">Verified</DuBadge>
            </div>
          </template>
        </DuChat>
      </div>
    `,
  }),
};

export const ManualMode: Story = {
  render: (args: any) => ({
    components: { DuChat, DuChatItem, DuBadge },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-2">
        <DuChat>
          <DuChatItem placement="start" variant="primary">
            <template #image>
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </template>
            <template #header>
              <div class="flex items-center gap-2">
                <span>Support</span>
                <DuBadge variant="primary" size="sm">Staff</DuBadge>
              </div>
            </template>
            <template #message>
              Hello! How can I help you today?
            </template>
            <template #footer>
              <time class="text-xs opacity-50">12:45</time>
            </template>
          </DuChatItem>
          
          <DuChatItem placement="end" variant="secondary">
            <template #image>
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </template>
            <template #header>
              <span>You</span>
            </template>
            <template #message>
              I have a question about my recent order.
            </template>
            <template #footer>
              <time class="text-xs opacity-50">12:46</time>
            </template>
          </DuChatItem>
          
          <DuChatItem placement="start" variant="primary">
            <template #image>
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </template>
            <template #message>
              Of course, I'd be happy to help with that. Can you provide your order number?
            </template>
            <template #footer>
              <time class="text-xs opacity-50">12:47</time>
            </template>
          </DuChatItem>
        </DuChat>
      </div>
    `,
  }),
};

export const WithoutImages: Story = {
  args: {
    items: [
      {
        message: "Message without image",
        header: "User",
        footer: "Sent at 10:00",
        placement: "start",
      },
      {
        message: "Reply without image",
        header: "You",
        footer: "Sent at 10:05",
        placement: "end",
      },
    ],
  },
};

export const SimpleChat: Story = {
  args: {
    items: [
      {
        message: "Simple message without header or footer",
        placement: "start",
        variant: "primary",
      },
      {
        message: "Simple reply",
        placement: "end",
        variant: "secondary",
      },
    ],
  },
}; 