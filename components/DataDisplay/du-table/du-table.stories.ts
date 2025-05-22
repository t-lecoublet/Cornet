import type { Meta, StoryObj } from "@storybook/vue3"
import DuTable from "./du-table.vue"
import DuTableItem from "./du-table-item.vue"
import DuBadge from "../du-badge/du-badge.vue"
import DuButton from "../../Actions/du-button/du-button.vue"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"

const meta = {
  title: "Components/DataDisplay/Table",
  component: DuTable,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl,
    columns: {
      control: "object",
      description:
        "Array of column definitions with key, label and optional customClass",
    },
    rows: {
      control: "object",
      description:
        "Array of row data objects with id and values corresponding to column keys",
    },
    zebra: {
      control: "boolean",
      description: "Apply zebra-striping to table rows",
    },
    pinRows: {
      control: "boolean",
      description: "Pin header and footer rows",
    },
    pinCols: {
      control: "boolean",
      description: "Pin first column",
    },
    customClass: {
      control: "text",
      description: "Custom class to apply to the table",
    },
  },
  args: {
    columns: [
      { key: "name", label: "Name" },
      { key: "job", label: "Job" },
      { key: "status", label: "Status" },
      { key: "action", label: "Action" },
    ],
    rows: [
      {
        id: 1,
        name: "Cy Ganderton",
        job: "Quality Control Specialist",
        status: "active",
      },
      {
        id: 2,
        name: "Hart Hagerty",
        job: "Desktop Support Technician",
        status: "inactive",
      },
      {
        id: 3,
        name: "Brice Swyre",
        job: "Tax Accountant",
        status: "active",
      },
    ],
    zebra: false,
    pinRows: false,
    pinCols: false,
    size: "default",
    customClass: "",
  },
} satisfies Meta<typeof DuTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Zebra: Story = {
  args: {
    zebra: true,
  },
}

export const PinnedRows: Story = {
  args: {
    pinRows: true,
  },
  render: (args: any) => ({
    components: { DuTable },
    setup() {
      return { args }
    },
    template: `
                <DuTable v-bind="args" class="h-28"></DuTable>
        `,
  }),
}

export const PinnedColumns: Story = {
  args: {
    pinCols: true,
  },
}

export const CompactSize: Story = {
  args: {
    size: "xs",
  },
}

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
}

export const WithFooter: Story = {
  args: {
    footer: true,
  },
}

export const ManualMode: Story = {
  render: (args: any) => ({
    components: { DuTable, DuTableItem, DuBadge, DuButton },
    setup() {
      return { args }
    },
    template: `
      <DuTable zebra size="md">
        <thead>
          <tr>
            <DuTableItem isHeader>Name</DuTableItem>
            <DuTableItem isHeader>Job</DuTableItem>
            <DuTableItem isHeader>Status</DuTableItem>
            <DuTableItem isHeader>Action</DuTableItem>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DuTableItem>Cy Ganderton</DuTableItem>
            <DuTableItem>Quality Control Specialist</DuTableItem>
            <DuTableItem>
              <DuBadge variant="success" size="sm">active</DuBadge>
            </DuTableItem>
            <DuTableItem>
              <DuButton variant="primary" size="xs">View</DuButton>
            </DuTableItem>
          </tr>
          <tr>
            <DuTableItem>Hart Hagerty</DuTableItem>
            <DuTableItem>Desktop Support Technician</DuTableItem>
            <DuTableItem>
              <DuBadge variant="error" size="sm">inactive</DuBadge>
            </DuTableItem>
            <DuTableItem>
              <DuButton variant="primary" size="xs">View</DuButton>
            </DuTableItem>
          </tr>
          <tr>
            <DuTableItem>Brice Swyre</DuTableItem>
            <DuTableItem>Tax Accountant</DuTableItem>
            <DuTableItem>
              <DuBadge variant="success" size="sm">active</DuBadge>
            </DuTableItem>
            <DuTableItem>
              <DuButton variant="primary" size="xs">View</DuButton>
            </DuTableItem>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <DuTableItem colspan="4" customClass="text-right font-bold">
              Total Employees: 3
            </DuTableItem>
          </tr>
        </tfoot>
      </DuTable>
    `,
  }),
}

export const ComplexTable: Story = {
  render: (args: any) => ({
    components: { DuTable, DuTableItem, DuBadge },
    setup() {
      return { args }
    },
    template: `
      <DuTable zebra size="sm" customClass="border border-base-300">
        <thead>
          <tr>
            <DuTableItem isHeader customClass="bg-primary text-primary-content">Product</DuTableItem>
            <DuTableItem isHeader customClass="bg-primary text-primary-content">Category</DuTableItem>
            <DuTableItem isHeader customClass="bg-primary text-primary-content">Price</DuTableItem>
            <DuTableItem isHeader customClass="bg-primary text-primary-content">Stock</DuTableItem>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DuTableItem>Smartphone XYZ</DuTableItem>
            <DuTableItem>Electronics</DuTableItem>
            <DuTableItem>$599</DuTableItem>
            <DuTableItem>
              <DuBadge variant="success" size="sm">In stock</DuBadge>
            </DuTableItem>
          </tr>
          <tr>
            <DuTableItem>Laptop ABC</DuTableItem>
            <DuTableItem>Electronics</DuTableItem>
            <DuTableItem>$1299</DuTableItem>
            <DuTableItem>
              <DuBadge variant="warning" size="sm">Limited stock</DuBadge>
            </DuTableItem>
          </tr>
          <tr>
            <DuTableItem>Headphones DEF</DuTableItem>
            <DuTableItem>Accessories</DuTableItem>
            <DuTableItem>$199</DuTableItem>
            <DuTableItem>
              <DuBadge variant="error" size="sm">Out of stock</DuBadge>
            </DuTableItem>
          </tr>
          <tr>
            <DuTableItem>Smartwatch GHI</DuTableItem>
            <DuTableItem>Accessories</DuTableItem>
            <DuTableItem>$299</DuTableItem>
            <DuTableItem>
              <DuBadge variant="success" size="sm">In stock</DuBadge>
            </DuTableItem>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <DuTableItem colspan="4" customClass="text-right">
              <div class="flex justify-between">
                <span>Updated: 06/01/2023</span>
                <span class="font-bold">Total products: 4</span>
              </div>
            </DuTableItem>
          </tr>
        </tfoot>
      </DuTable>
    `,
  }),
} 