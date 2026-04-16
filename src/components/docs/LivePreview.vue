<script lang="ts">
import { defineComponent, compile, h, ref, reactive, computed, watch, type Component } from 'vue'
import * as CornetComponents from 'daisyui-vue-kit'

const duComponents = Object.fromEntries(
  Object.entries(CornetComponents).filter(
    ([name, comp]) =>
      name.startsWith('Du') && comp && typeof comp === 'object' && !Array.isArray(comp),
  ),
) as Record<string, Component>

const WRAPPER = `<div class="flex items-center justify-center flex-wrap gap-3 min-h-20 w-full">`

export default defineComponent({
  props: {
    code: { type: String, required: true },
    script: { type: String, default: '' },
  },
  components: duComponents,
  setup(props) {
    if (props.script) {
      // eslint-disable-next-line no-new-func
      const setupFn = new Function('ref', 'reactive', 'computed', 'watch', props.script)

      const DynamicComp = defineComponent({
        components: duComponents,
        setup() {
          return setupFn(ref, reactive, computed, watch)
        },
        template: `${WRAPPER}${props.code}</div>`,
      })

      return () => h(DynamicComp)
    }

    return (...args: any[]) => {
      const fn = compile(
        `${WRAPPER}${props.code}</div>`,
      ) as unknown as (...a: any[]) => unknown
      return fn(...args)
    }
  },
})
</script>