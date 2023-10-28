import type { Meta, StoryObj } from "@storybook/react";

import { TestApp } from "./App";

const meta = {
  title: "Component/App",
  component: TestApp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof TestApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
