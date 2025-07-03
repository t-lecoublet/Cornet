import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import DuRating from "./du-rating.vue";
import DuRatingItem from "./du-rating-item.vue"
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import { ref } from "vue";
import { DU_RATING_SHAPES } from "./du-rating.types";

const meta: Meta<typeof DuRating> = {
  title: "Components/DataInput/Rating",
  component: DuRating,
  tags: ['autodocs'],
  argTypes: {
    ...(useSizeStoriesControl as ArgTypes),
    modelValue: { control: { type: "number" } },
    count: { control: { type: "number" } },
    halfStar: { control: "boolean" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    shape: {
      control: { type: "select" },
      options: DU_RATING_SHAPES,
    },
    color: { control: "text" },
    customClass: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof DuRating>;

// --- TEMPLATES ---
const defaultTplStr = `
  <div class="flex flex-col gap-4 w-80">
    <DuRating v-bind="args" v-model="ratingValue" />
    <div class="text-center">Valeur: {{ ratingValue }}</div>
  </div>
`;

const ratingSizesTplStr = `
<div class="flex flex-col gap-6 w-80">
  <div class="flex flex-col gap-2">
    <span>XS</span>
    <DuRating size="xs" v-model="values.xs" />
  </div>
  <div class="flex flex-col gap-2">
    <span>SM</span>
    <DuRating size="sm" v-model="values.sm" />
  </div>
  <div class="flex flex-col gap-2">
    <span>MD</span>
    <DuRating size="md" v-model="values.md" />
  </div>
  <div class="flex flex-col gap-2">
    <span>LG</span>
    <DuRating size="lg" v-model="values.lg" />
  </div>
  <div class="flex flex-col gap-2">
    <span>XL</span>
    <DuRating size="xl" v-model="values.xl" />
  </div>
</div>
`;
const ratingSizesScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const values = ref({ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 });
<\/script>`;

const ratingShapesTplStr = `
<div class="flex flex-col gap-6 w-80">
  <div class="flex flex-col gap-2">
    <span>Star</span>
    <DuRating shape="star" v-model="values.star" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Star-2</span>
    <DuRating shape="star-2" v-model="values.star2" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Heart</span>
    <DuRating shape="heart" v-model="values.heart" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Circle</span>
    <DuRating shape="circle" v-model="values.circle" />
  </div>
</div>
`;
const ratingShapesScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const values = ref({ star: 3, star2: 3, heart: 3, circle: 3 });
<\/script>`;

const ratingColorsTplStr = `
<div class="flex flex-col gap-6 w-80">
  <div class="flex flex-col gap-2">
    <span>Primary</span>
    <DuRating color="bg-primary" v-model="values.primary" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Secondary</span>
    <DuRating color="bg-secondary" v-model="values.secondary" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Orange</span>
    <DuRating color="bg-orange-500" v-model="values.orange" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Red</span>
    <DuRating color="bg-red-500" v-model="values.red" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Green</span>
    <DuRating color="bg-green-500" v-model="values.green" />
  </div>
</div>
`;
const ratingColorsScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const values = ref({ primary: 3, secondary: 3, orange: 3, red: 3, green: 3 });
<\/script>`;

const halfStarRatingTplStr = `
<div class="flex flex-col gap-4 w-80">
  <DuRating halfStar v-model="halfStarValue" />
  <div class="text-center">Value: {{ halfStarValue }}</div>
</div>
`;
const halfStarRatingScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const halfStarValue = ref(3.5);
<\/script>`;

const clearableRatingTplStr = `
<div class="flex flex-col gap-4 w-80">
  <DuRating clearable v-model="clearableValue" />
  <div class="text-center">Value: {{ clearableValue }} (click on the same star to clear)</div>
</div>
`;
const clearableRatingScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const clearableValue = ref(3);
<\/script>`;

const disabledRatingTplStr = `
<div class="flex flex-col gap-2 w-80">
  <span>Rating disabled</span>
  <DuRating disabled v-model="disabledValue" />
</div>
`;
const disabledRatingScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const disabledValue = ref(3);
<\/script>`;

const manualRatingTplStr = `
<div class="flex flex-col gap-4 w-80">
  <DuRating v-model="manualValue">
    <DuRatingItem :value="1" :checked="manualValue === 1" @change="manualValue = $event" color="bg-red-500"/>
    <DuRatingItem :value="2" :checked="manualValue === 2" @change="manualValue = $event" color="bg-orange-500" />
    <DuRatingItem :value="3" :checked="manualValue === 3" @change="manualValue = $event" color="bg-yellow-500" />
    <DuRatingItem :value="4" :checked="manualValue === 4" @change="manualValue = $event" color="bg-lime-500" />
    <DuRatingItem :value="5" :checked="manualValue === 5" @change="manualValue = $event" color="bg-green-500" />
  </DuRating>
  <div class="text-center">Value: {{ manualValue }}</div>
</div>
`;
const manualRatingScriptStr = `<script setup lang=\"ts\">
import { ref } from 'vue';
const manualValue = ref(3);
<\/script>`;

// --- STORIES ---
export const Default: Story = {
  render: (args: any) => ({
    components: { DuRating },
    setup() {
      const ratingValue = ref(args.modelValue || 0);
      return { args, ratingValue };
    },
    template: defaultTplStr,
  }),
  args: {
    modelValue: 3,
    count: 5,
    halfStar: false,
    clearable: false,
    disabled: false,
    shape: "star-2",
  },
};

export const RatingSizes: Story = {
  render: () => ({
    components: { DuRating },
    setup() {
      const values = ref({ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 });
      return { values };
    },
    template: ratingSizesTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${ratingSizesScriptStr}\n${ratingSizesTplStr}`,
        language: 'html',
      },
    },
  },
};

export const RatingShapes: Story = {
  render: () => ({
    components: { DuRating },
    setup() {
      const values = ref({ star: 3, star2: 3, heart: 3, circle: 3 });
      return { values };
    },
    template: ratingShapesTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${ratingShapesScriptStr}\n${ratingShapesTplStr}`,
        language: 'html',
      },
    },
  },
};

export const RatingColors: Story = {
  render: () => ({
    components: { DuRating },
    setup() {
      const values = ref({ primary: 3, secondary: 3, orange: 3, red: 3, green: 3 });
      return { values };
    },
    template: ratingColorsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${ratingColorsScriptStr}\n${ratingColorsTplStr}`,
        language: 'html',
      },
    },
  },
};

export const HalfStarRating: Story = {
  render: () => ({
    components: { DuRating },
    setup() {
      const halfStarValue = ref(3.5);
      return { halfStarValue };
    },
    template: halfStarRatingTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${halfStarRatingScriptStr}\n${halfStarRatingTplStr}`,
        language: 'html',
      },
    },
  },
};

export const ClearableRating: Story = {
  render: () => ({
    components: { DuRating },
    setup() {
      const clearableValue = ref(3);
      return { clearableValue };
    },
    template: clearableRatingTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${clearableRatingScriptStr}\n${clearableRatingTplStr}`,
        language: 'html',
      },
    },
  },
};

export const DisabledRating: Story = {
  render: () => ({
    components: { DuRating },
    setup() {
      const disabledValue = ref(3);
      return { disabledValue };
    },
    template: disabledRatingTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${disabledRatingScriptStr}\n${disabledRatingTplStr}`,
        language: 'html',
      },
    },
  },
};

export const ManualRating: Story = {
  render: () => ({
    components: { DuRating, DuRatingItem },
    setup() {
      const manualValue = ref(3);
      return { manualValue };
    },
    template: manualRatingTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${manualRatingScriptStr}\n${manualRatingTplStr}`,
        language: 'html',
      },
    },
  },
}; 