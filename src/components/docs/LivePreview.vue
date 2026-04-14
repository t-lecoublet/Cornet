<script lang="ts">
import { defineComponent, compile, type Component } from 'vue'
import * as CornetComponents from 'daisyui-vue-kit'

const duComponents = Object.fromEntries(
  Object.entries(CornetComponents).filter(
    ([name, comp]) =>
      name.startsWith('Du') && comp && typeof comp === 'object' && !Array.isArray(comp),
  ),
) as Record<string, Component>

export default defineComponent({
  props: {
    code: { type: String, required: true },
  },
  components: duComponents,
  setup(props) {
    return (...args: any[]) =>
      compile(
        `<div class="flex items-center justify-center flex-wrap gap-3 min-h-20 w-full">${props.code}</div>`,
      )(...args)
  },
})
</script>
