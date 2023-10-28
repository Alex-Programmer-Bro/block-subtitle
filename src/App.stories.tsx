import type { Meta, StoryObj } from "@storybook/react";

import { App } from "./App";

const meta = {
  title: "Component/App",
  component: App,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
