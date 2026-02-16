import type { Component } from "vue";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  as?: string | Component;
} 