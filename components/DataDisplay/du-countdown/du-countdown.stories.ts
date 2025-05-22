import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DuCountdown from './du-countdown.vue'
import DuCountdownGroup from './du-countdown-group.vue'
import DuButton from '../../Actions/du-button/du-button.vue'

const meta = {
  title: 'Components/DataDisplay/Countdown',
  component: DuCountdown,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Static value for the countdown',
    },
    targetDate: {
      control: { type: 'date' },
      description: 'Target date for the countdown',
    },
    format: {
      control: { type: 'select' },
      options: ['days', 'hours', 'minutes', 'seconds'],
      description: 'Format of the countdown',
    },
    separator: {
      control: 'text',
      description: 'Separator character',
    },
    customClass: {
      control: 'text',
      description: 'Custom class to apply to the countdown',
    },
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the countdown automatically',
    },
  },
  args: {
    value: 30,
    targetDate: undefined,
    format: 'seconds',
    separator: ':',
    customClass: '',
    autoStart: true,
  },
} satisfies Meta<typeof DuCountdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithTargetDate: Story = {
  args: {
    value: undefined,
    targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    format: 'seconds',
  },
}

export const WithDifferentFormats: Story = {
  render: (args: any) => ({
    components: { DuCountdown },
    setup() {
      // Set target date to 2 days, 3 hours, 45 minutes and 30 seconds from now
      const targetDate = new Date(
        Date.now() +
          2 * 24 * 60 * 60 * 1000 +
          3 * 60 * 60 * 1000 +
          45 * 60 * 1000 +
          30 * 1000,
      )

      return { targetDate }
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <span>Days:</span>
          <DuCountdown :target-date="targetDate" format="days" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Hours:</span>
          <DuCountdown :target-date="targetDate" format="hours" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Minutes:</span>
          <DuCountdown :target-date="targetDate" format="minutes" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Seconds:</span>
          <DuCountdown :target-date="targetDate" format="seconds" />
        </div>
      </div>
    `,
  }),
}

export const CountdownGroupExample: Story = {
  render: (args: any) => ({
    components: { DuCountdownGroup },
    setup() {
      // Set target date to 2 days, 3 hours, 45 minutes and 30 seconds from now
      const targetDate = new Date(
        Date.now() +
          2 * 24 * 60 * 60 * 1000 +
          3 * 60 * 60 * 1000 +
          45 * 60 * 1000 +
          30 * 1000,
      )

      return { targetDate }
    },
    template: `
      <div class="flex flex-col gap-4">
        <DuCountdownGroup :target-date="targetDate" />
        
        <DuCountdownGroup 
          :target-date="targetDate" 
          :labels="{ days: 'jours', hours: 'heures', minutes: 'min', seconds: 'sec' }"
          separator="-"
        />
        
        <DuCountdownGroup 
          :target-date="targetDate" 
          :show-days="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="true"
        />
      </div>
    `,
  }),
}

export const WithControls: Story = {
  render: (args: any) => ({
    components: { DuCountdown, DuButton },
    setup() {
      const countdownRef = ref<InstanceType<typeof DuCountdown> | null>(null)
      const value = ref(30)

      const start = () => {
        if (countdownRef.value) {
          countdownRef.value.start()
        }
      }

      const stop = () => {
        if (countdownRef.value) {
          countdownRef.value.stop()
        }
      }

      const reset = () => {
        if (countdownRef.value) {
          countdownRef.value.reset()
        }
      }

      return { countdownRef, value, start, stop, reset }
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <DuCountdown ref="countdownRef" :value="value" :auto-start="false" />
        </div>
        
        <div class="flex gap-2">
          <DuButton variant="primary" @click="start">Start</DuButton>
          <DuButton variant="secondary" @click="stop">Stop</DuButton>
          <DuButton variant="accent" @click="reset">Reset</DuButton>
        </div>
      </div>
    `,
  }),
}

export const LargeStyled: Story = {
  render: (args: any) => ({
    components: { DuCountdown },
    setup() {
      const targetDate = new Date(Date.now() + 60 * 1000) // 60 seconds from now

      return { targetDate }
    },
    template: `
      <div class="flex flex-col items-center gap-4">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-2">Sale ends in:</h3>
          <div class="flex items-center justify-center">
            <span class="countdown font-mono text-6xl">
              <span style="--value:10;"></span>:
              <span style="--value:24;"></span>:
              <span style="--value:53;"></span>
            </span>
          </div>
          <div class="flex justify-center gap-4 text-xs mt-2">
            <span>HOURS</span>
            <span>MINUTES</span>
            <span>SECONDS</span>
          </div>
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-2">Live countdown:</h3>
          <div class="flex items-center justify-center">
            <span class="countdown font-mono text-6xl">
              <DuCountdown :target-date="targetDate" format="seconds" />
            </span>
          </div>
          <div class="flex justify-center text-xs mt-2">
            <span>SECONDS REMAINING</span>
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithEndEvent: Story = {
  render: (args: any) => ({
    components: { DuCountdown, DuButton },
    setup() {
      const countdownRef = ref<InstanceType<typeof DuCountdown> | null>(null)
      const value = ref(5)
      const message = ref("")

      const handleCountdownEnd = () => {
        message.value = "Countdown finished !"
        setTimeout(() => {
          message.value = ""
        }, 3000)
      }

      const resetCountdown = () => {
        if (countdownRef.value) {
          value.value = 5
          countdownRef.value.reset()
          countdownRef.value.start()
          message.value = ""
        }
      }

      return {
        countdownRef,
        value,
        message,
        handleCountdownEnd,
        resetCountdown,
      }
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <DuCountdown
            ref="countdownRef"
            :value="value"
            @end="handleCountdownEnd"
          />
          <span class="text-success font-bold">{{ message }}</span>
        </div>
        
        <div class="flex gap-2">
          <DuButton variant="primary" @click="resetCountdown">Reset & Start</DuButton>
        </div>
      </div>
    `,
  }),
} 