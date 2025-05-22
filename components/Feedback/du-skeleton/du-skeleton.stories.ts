import type { Meta, StoryObj } from "@storybook/vue3";
import DuSkeleton from "./du-skeleton.vue";

const meta: Meta<typeof DuSkeleton> = {
  title: "Components/Feedback/Skeleton",
  component: DuSkeleton,
};

export default meta;

type Story = StoryObj<typeof DuSkeleton>;

const defaultTplStr = `
<div class="inline-flex flex-col gap-2 items-center">
  <DuSkeleton class="w-32 h-32" />
  <hr>
  <div class="flex w-52 flex-col gap-4">
    <div class="flex items-center gap-4">
      <DuSkeleton class="h-16 w-16 shrink-0 rounded-full" />
      <div class="flex flex-col gap-4">
        <DuSkeleton class="h-4 w-20"/>
        <DuSkeleton class="h-4 w-28"/>
      </div>
    </div>
    <DuSkeleton class="h-32 w-full" />
  </div>
  <hr>
  <div class="flex w-52 flex-col gap-4">
    <DuSkeleton class="h-32 w-full" />
    <DuSkeleton class="h-4 w-28" />
    <DuSkeleton class="h-4 w-full" />
    <DuSkeleton class="h-4 w-full" />
  </div>
</div>
`;

const TemplateSkeleton: Story = {
  render: (args: any) => ({
    components: { DuSkeleton },
    template: defaultTplStr,
  }),
};
export const DefaultSkeleton = { ...TemplateSkeleton }; 