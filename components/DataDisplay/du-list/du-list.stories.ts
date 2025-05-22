import type { Meta, StoryObj } from '@storybook/vue3'
import DuList from './du-list.vue'
import DuListRow from './du-list-row.vue'

const meta = {
  title: 'Components/DataDisplay/List',
  component: DuList,
  tags: ['autodocs'],
  argTypes: {
    class: {
      control: 'text',
      description: 'Custom class to apply to the list component',
    },
  },
  args: {
    class: '',
  },
} satisfies Meta<typeof DuList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: any) => ({
    components: { DuList, DuListRow },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-lg">
        <DuList :class="args.class + ' bg-base-100 rounded-box shadow-md'">
          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
          <DuListRow>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/64/94/94"/></div>
            <div>
              <div>Dio Lupa</div>
              <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </DuListRow>
          <DuListRow>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/23/94/94"/></div>
            <div>
              <div>Ellie Beilish</div>
              <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </DuListRow>
          <DuListRow>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/42/94/94"/></div>
            <div>
              <div>Sabrino Gardener</div>
              <div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </DuListRow>
        </DuList>
      </div>
    `,
  }),
}

export const ThirdColumnGrows: Story = {
  render: (args: any) => ({
    components: { DuList, DuListRow },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full max-w-lg">
        <DuList :class="args.class + ' bg-base-100 rounded-box shadow-md'">
          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
          <DuListRow>
            <div class="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/64/94/94"/></div>
            <div class="list-col-grow">
              <div>Dio Lupa</div>
              <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
          </DuListRow>
          <DuListRow>
            <div class="text-4xl font-thin opacity-30 tabular-nums">02</div>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/23/94/94"/></div>
            <div class="list-col-grow">
              <div>Ellie Beilish</div>
              <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
          </DuListRow>
          <DuListRow>
            <div class="text-4xl font-thin opacity-30 tabular-nums">03</div>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/42/94/94"/></div>
            <div class="list-col-grow">
              <div>Sabrino Gardener</div>
              <div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
          </DuListRow>
        </DuList>
      </div>
    `,
  }),
}

export const WithListColWrap: Story = {
  render: () => ({
    components: { DuList, DuListRow },
    template: `
      <div class="w-full max-w-lg">
        <DuList class="bg-base-100 rounded-box shadow-md">
          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Content with wrapping</li>
          <DuListRow>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/64/94/94"/></div>
            <div>
              <div>Song Title</div>
              <div class="text-xs opacity-60">Artist Name</div>
            </div>
            <div class="list-col-wrap bg-base-200 w-full mt-2 p-2 rounded-box">
              <p>This is additional content that wraps to the next line using list-col-wrap</p>
            </div>
          </DuListRow>
          <DuListRow>
            <div><img class="size-10 rounded-box" src="https://picsum.photos/id/23/94/94"/></div>
            <div>
              <div>Another Song</div>
              <div class="text-xs opacity-60">Another Artist</div>
            </div>
            <div class="list-col-wrap bg-base-200 w-full mt-2 p-2 rounded-box">
              <p>You can place any content here that needs to take the full width</p>
            </div>
          </DuListRow>
        </DuList>
      </div>
    `,
  }),
} 