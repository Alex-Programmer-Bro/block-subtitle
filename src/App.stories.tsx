import type { Meta, StoryObj } from "@storybook/react";

import { StoryBookApp } from "./App";

const meta = {
  title: "Component/App",
  component: StoryBookApp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof StoryBookApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
